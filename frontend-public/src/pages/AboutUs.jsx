import React from "react";
import Title from "../components/Titles";
import SubTitle from "../components/SubTitle";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8">
        <Title text="Acerca de Nosotros"/>
        
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src="https://th.bing.com/th/id/OIP.Xlt_gUiqBWB9Tbep0a0irgHaEi?r=0&rs=1&pid=ImgDetMain"
            alt="Equipo ByteShop"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
          <div>
                <SubTitle
                text="Nuestra Historia"
                />
            <p className="text-gray-700 mb-4">
              ByteShop nació en 20214 en medio de un momento de transformación
              digital sin precedentes. Su fundador, Bryan Miranda, apasionado
              por la tecnología desde la infancia, decidió crear un espacio en
              línea donde cualquier persona pudiera acceder a productos
              electrónicos de calidad con confianza y soporte personalizado.
            </p>
            <p className="text-gray-700 mb-4">
              Lo que comenzó como un pequeño catálogo de laptops en su garaje,
              pronto se convirtió en una tienda digital de referencia para
              entusiastas de la tecnología, profesionales y gamers. Con el paso
              del tiempo, ByteShop fue creciendo gracias a su compromiso con la
              innovación, la atención al cliente y la búsqueda constante de los
              mejores productos del mercado.
            </p>
            <p className="text-gray-700">
              Hoy en día, ByteShop sigue siendo 100% independiente y gestionado
              por un equipo de jóvenes apasionados por lo digital. Creemos que
              la tecnología debe empoderar, conectar y transformar vidas.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h3 className="text-xl font-medium text-gray-800 mb-2">Nuestro compromiso</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            En ByteShop nos esforzamos cada día para brindarte productos de calidad,
            envíos rápidos y una experiencia de compra fácil y segura.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
