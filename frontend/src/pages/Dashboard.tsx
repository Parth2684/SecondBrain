import axios from "axios";
import { useEffect, useState } from "react";
import { AddBrain } from "../components/AddBrain";
import { Topbar } from "../components/Topbar";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";

interface BrainSchema {
    title: string;
    description: string;
    _id: string
}

interface LinkPreviewData {
    title: string;
    description: string;
    image: string;
    url: string;
}

const extractUrls = (text: string): string[] => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
};

const fetchMetaData = async (url: string): Promise<LinkPreviewData | null> => {
    try {
        const response = await axios.get(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
        const data = response.data;
        if (data.status === "success" && data.data.image) {
            return {
                title: data.data.title || "No Title",
                description: data.data.description || "No Description",
                image: data.data.image.url || "", 
                url: data.data.url || url
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return null;
    }
};

const LinkPreview = ({ url }: { url: string }) => {
    const [meta, setMeta] = useState<LinkPreviewData | null>(null);
    
    useEffect(() => {
        fetchMetaData(url).then(setMeta);
    }, [url]);

    if (!meta) return null;

    return (
        <div className="border p-2 rounded-md bg-gray-100 mt-2">
            <a href={meta.url} target="_blank" rel="noopener noreferrer">
                <img src={meta.image} alt={meta.title} className="w-full h-40 object-cover rounded-md" />
                <div className="text-lg font-bold">{meta.title}</div>
                <div className="text-sm text-gray-700">{meta.description}</div>
            </a>
        </div>
    );
};

export const Dashboard = () => {
    const [brain, setBrain] = useState<BrainSchema[]>([]);
    const [showOverlay, setShowOverlay] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [editingBrainId, setEditingBrainId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBrain() {
            try {
                const response = await axios.get("http://localhost:3000/getBrain", {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`
                    }
                });
                setBrain(response.data.brain);
            } catch (error) {
                console.error("Error fetching brain data:", error);
            }
        }
        fetchBrain();
    }, []);

    const handleEdit = async () => {
        if (!editingBrainId) {
            console.error("No brain ID found for editing");
            return;
        }
    
        try {
            await axios.put(
                `http://localhost:3000/editBrain?brainId=${editingBrainId}`, 
                {
                    title: newTitle,
                    description: newDescription
                },
                {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`
                    }
                }
            );
            setShowOverlay(false);
            setBrain(prevBrain =>
                prevBrain.map(brainItem =>
                    brainItem._id === editingBrainId ? { ...brainItem, title: newTitle, description: newDescription } : brainItem
                )
            ); 
        } catch (error) {
            console.error("Error updating brain data:", error);
        }
    };

    return (
        <div>
            <Topbar isSigned={true} />
            <div className="h-screen overflow-y-auto border p-4">
                <AddBrain />
                <div>
                    <div className="columns-3 gap-4">
                        {brain.map((item, index) => {
                            const urls = extractUrls(item.description);
                            return (
                                <div key={index} className="border bg-white opacity-90 m-2 rounded-md p-4 break-inside-avoid">
                                    {/* SVG Trigger */}
                                    <div className="flex justify-self-end">
                                    <svg
                                        onClick={() => {
                                            setNewTitle(item.title); 
                                            setNewDescription(item.description);
                                            setEditingBrainId(item._id); // Store the correct ID
                                            setShowOverlay(true);
                                        }} 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        strokeWidth="1.5" 
                                        stroke="currentColor" 
                                        className="size-6 cursor-pointer"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" 
                                        />
                                    </svg>

                                    <svg
                                    onClick={async () => {
                                        await axios.delete(`http://localhost:3000/deleteBrain?brainId=${item._id}`,{
                                            headers:{
                                                Authorization: `${localStorage.getItem("token")}`
                                            }
                                        })
                                        window.location.reload()
                                    }} 
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
                                    </div>
                                    <div className="h-full">
                                        <div className="text-indigo-950 text-xl font-semibold">
                                            Title: {item.title}
                                        </div>
                                        <div className="text-indigo-950">
                                            Description: {item.description}
                                        </div>
                                        {urls.map((url, i) => (
                                            <LinkPreview key={i} url={url} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}<div>

        {showOverlay && (
                        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 p-4">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                <h2 className="text-xl font-bold mb-4">Edit Brain</h2>
                                <InputBox 
                                    label="Title" 
                                    placeholder="Enter the new title" 
                                    type="text" 
                                    onChange={(e) => setNewTitle(e.target.value)} 
                            
                                />
                                <InputBox 
                                    label="Description" 
                                    placeholder="Enter the new Description" 
                                    type="text" 
                                    onChange={(e) => setNewDescription(e.target.value)} 
                            
                                />
                                <div className="flex justify-end gap-2 mt-4">
                                    <Button label="Cancel" onClick={() => setShowOverlay(false)} />
                                    <Button label="Submit" onClick={handleEdit} />
                                </div>
                            </div>
                        </div>
                    )}
                                </div>

                            </div>    
                        </div>  
            </div>

            
        </div>
    );
};
