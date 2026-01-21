import {useParams} from "react-router";
import {Header} from "../components/navigation/Header.tsx";
import Loader from "../components/Loader.tsx";
import {useEffect, useState} from "react";

export default function ChatDetail() {
    const [loading, setLoading] = useState(true);

    const {id} = useParams();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading && (
                <Loader/>
            )}

            {!loading && (
                <>
                    <Header title={`Messages avec ${id}`}/>
                    <div className="px-6 py-10 pb-24">
                        <div className="chat chat-start">
                            <div className="chat-bubble">
                                It's over Anakin,
                                <br/>
                                I have the high ground.
                            </div>
                        </div>
                        <div className="chat chat-end">
                            <div className="chat-bubble bg-indigo-500/20">You underestimate my power!</div>
                        </div>
                        <div className="chat chat-start">
                            <div className="chat-bubble">
                                It's over Anakin,
                                <br/>
                                I have the high ground.
                            </div>
                        </div>
                        <div className="chat chat-end">
                            <div className="chat-bubble bg-indigo-500/20">You underestimate my power!</div>
                        </div>
                        <div className="chat chat-end">
                            <div className="chat-bubble bg-indigo-500/20">You underestimate my power!</div>
                        </div>
                        <div className="chat chat-end">
                            <div className="chat-bubble bg-indigo-500/20">You underestimate my power!</div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}