import React from "react";
import Navbar from "./UI/Navbar";
import CTA from "./UI/CTA";
import Stats from "./UI/Stats";
import Footer from "./UI/Footer";

function Home() {
  const sp1 = "Consigue los mejores boletos,";
  const sp2 = "a los mejores precios!";
  const p =
    "Compra tus entradas para los mejores conciertos, eventos deportivos, obras de teatros, festivales y mucho más.";
  const a = "Explorar Eventos";
  const cta = "/events";
  return (
    <>
      <Navbar />
      <CTA sp1={sp1} sp2={sp2} p={p} a={a} cta={cta} />
      <Stats />
      <Footer />
    </>
  );
}

export default Home;
