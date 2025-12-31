import {HomeHeader} from "../navigation/HomeHeader.tsx";
import SelectedCategory from "../components/SelectedCategory.tsx";
import Card from "../components/Card.tsx";

export default function Accueil() {
    return (
        <>
            <main className="flex-1 overflow-y-auto mx-10 my-10">
                <HomeHeader/>
                <SelectedCategory/>
                <div className="flex flex-col gap-y-7">
                    <Card/>
                    <Card/>
                    <Card/>
                </div>

            </main>
        </>
    )
}