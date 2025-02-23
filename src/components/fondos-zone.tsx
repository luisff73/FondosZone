

export default function FondosZoneLogo() {
    return (
        <div className="font-roboto flex md:flex-row items-center md:items-start leading-none rounded-md w-full bg-color-200 p-4">

            <img
                src="/fondoszone_logo.png"  // Ruta pública
                alt="Logo Fondos Zone"
                className="h-15 w-15 md:h-36 md:w-36 self-start"
            />

            <div className="flex flex-col ml-4 items-start">
                <p className="text-[15px] md:text-[22px] self-start mr-4 text-color-500 " >Cuidamos</p>
                <p className="text-[20px] md:text-[24px] self-start md:font-bold text-color-400 mt-2">TU CARTERA</p>
            </div>
        </div>
    );
}
