import axios from "axios";
import { useEffect, useState } from "react";
import { AddBrain } from "../components/AddBrain";
import { Topbar } from "../components/Topbar";

interface BrainSchema {
    title: string;
    description: string;
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

    useEffect(() => {
        async function fetchBrain() {
            const response = await axios.get("http://localhost:3000/getBrain", {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            });
            setBrain(response.data.brain);
        }
        fetchBrain();
    }, []);

    return <div>
            <Topbar isSigned={true} />
        <div className="h-screen overflow-y-auto border p-4">
            <AddBrain />
            <div className="columns-3 gap-4">
                {brain.map((item, index) => {
                    const urls = extractUrls(item.description);
                    return (
                        <div key={index} className="border bg-white opacity-90 m-2 rounded-md p-4 break-inside-avoid">
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
                })}
            </div>
        </div>
        </div>
        
    
};
