import {Header} from "../navigation/Header.tsx";
import Card from "../components/Card.tsx";

export default function Notification() {
    return (
        <>
            <main className="flex-1 overflow-y-auto mx-10 my-10">
                <Header title={"Notification"}/>
                <div className="flex flex-col gap-y-7">
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </main>
        </>
    )
}