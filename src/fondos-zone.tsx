

export default function FondosZoneLogo() {
    return (
        <div className="font-roboto flex md:flex-row items-center md:items-start leading-none text-white w-full bg-green-500 p-4">

            <img
                src="/fondoszone_logo.png"  // Ruta pública
                alt="Logo Fondos Zone"
                className="h-15 w-15 md:h-36 md:w-36 self-start"
            />

            <div className="flex flex-col md:flex-row ml-4 items-start">
                <p className="text-[15px] md:text-[30px] self-start mr-4">Tu cartera de</p>
                <p className="text-[20px] md:text-[30px] self-start md:font-bold">FONDOS</p>
            </div>
        </div>
    );
}
