import {NavLink} from "react-router";
import {menuItems} from "../../data/menu.ts";
import IonIcon from "@reacticons/ionicons";

export function NavBar() {

    return (
        <nav
            className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-200 px-4 py-2 h-16 flex justify-around z-40 shadow-lg">
            {menuItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({isActive}) =>
                        `flex flex-row items-center gap-1 py-2 px-4 rounded-lg transition-colors duration-300 ${
                            isActive
                                ? "text-white bg-indigo-800"
                                : "text-gray-400 hover:text-gray-200"
                        }`
                    }
                >
                    {({isActive}) => (
                        <>
                            <IonIcon
                                name={isActive ? item.icon : `${item.icon}-outline` as any}
                                color={isActive ? "#ffffff" : "#9ca3af"}
                                style={{fontSize: '24px'}}
                            />
                            {isActive && (
                                <span className="text-xs font-medium transition-all duration-300 ease-out">
                                     {item.name}
                                </span>
                            )}
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
    );
}
