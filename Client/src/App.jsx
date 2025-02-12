import "./App.css";

import { Tooltip } from "react-tooltip";
import { useEffect, useId, useRef, useState } from "react";
import Swal from "sweetalert2";
import Modal from "react-modal";

import { Container } from "./components/UI";

function App() {
  const [contador, setContador] = useState(undefined);
  const tooltipLetter = useId();
  const tooltipGithub = useId();
  const audioRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  Modal.setAppElement(document.getElementById("root"));

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "20%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    setInterval(calcularConteo, 1000);
  }, []);

  useEffect(() => {
    Swal.fire({
      text: "¿Deseas visualizar con audio?",
      imageUrl: "/Sound.gif",
      imageHeight: 100,
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      heightAuto: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        handlePlay();
      }
    });
  }, []);

  const handlePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch((error) => {
        console.error("Error al reproducir:", error);
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPage(1);
  };

  const calcularConteo = () => {
    const targetDate = new Date("2025-02-14T00:00:00"); // 14 de febrero de 2025 a las 12 de la medianoche
    const now = new Date();

    if (now < targetDate) {
      const timeDifference = targetDate - now;

      // Cálculos de tiempo
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );

      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setContador(`${days}d ${hours}hr ${minutes}min ${seconds}sg`);
    } else {
      setContador(null);
    }
  };

  const abrirCarta = () => {
    const targetDate = new Date("2025-02-14T00:00:00"); // 14 de febrero de 2025 a las 12 de la medianoche
    const now = new Date();

    if (now < targetDate) {
      Swal.fire({
        text: "¡Aún no puedes abrirla!",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <Container
        className="text-center text-black select-none"
        blockEvents={showModal}
      >
        <Tooltip id={tooltipLetter} />
        <Tooltip id={tooltipGithub} />

        <audio ref={audioRef} autoPlay loop>
          <source src="/Song.mp3" type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>

        <div className="w-[80%] max-w-[250px] sm:w-[60%] md:w-[50%] md:max-w-[500px]">
          <span className="text-lg sm:text-xl md:text-2xl mb-1 text-red-600">
            Valentine's Day Letter
          </span>
          <div
            data-tooltip-id={tooltipLetter}
            data-tooltip-content="Click para abrir"
            className="cursor-pointer hover:bg-gray-200 h-28 sm:h-36 md:h-44 bg-white rounded-md flex items-center justify-center border-gray-300 border shadow-lg"
            onClick={abrirCarta}
            data-tooltip-place="right"
          >
            <img
              className="w-6 sm:w-8 md:w-9 animate-bounce"
              src="/favicon.svg"
              alt="Heart"
            />
          </div>

          <div className="flex flex-col items-center justify-center mt-2">
            {contador !== undefined && contador !== null ? (
              <>
                <span>Podrás abrirla dentro de</span>
                <span className="font-bond">{contador}</span>
              </>
            ) : contador !== undefined && contador === null ? (
              <span className="sm:text-lg">¡Ábrela!</span>
            ) : null}
          </div>
        </div>

        <footer className="pb-[15vh] sm:pb-[5vh] text-sm sm:text-base">
          Hecho con ❤️ por{" "}
          <a
            href="https://github.com/LisandrOviedo"
            className="text-red-600 hover:text-red-500"
            target="_blank"
            rel="noopener noreferrer"
            data-tooltip-id={tooltipGithub}
            data-tooltip-content="Click para ver detalles"
          >
            Lisandro Oviedo
          </a>{" "}
          © 2025
        </footer>
      </Container>

      <Modal
        isOpen={showModal}
        onRequestClose={() => handleCloseModal}
        style={customStyles}
        contentLabel="Valentine’s Day Letter"
        overlayClassName="overlay"
      >
        <div className="text-black flex flex-col justify-center select-none">
          <h1 className="text-center text-red-600 text-xl">
            Valentine’s Day Letter
          </h1>
          <br />
          {page === 1 && (
            <>
              <span className="text-center">
                ¿Quién iba a pensar que viviríamos todo lo que hemos vivido?
              </span>
              <span className="text-center">
                ¿Quién iba a pensar querernos como nos queremos?
              </span>
              <span className="text-center">
                ¿Quién iba a pensar llegar tan lejos?
              </span>
              <br />
              <p className="text-center">
                Hace unos años atrás dimos un paso al frente en nuestra amistad.
                Sin saber si nos iría bien o si nos iría mal, sin conocer tanto
                al otro, pero con una buena sensación y, sobre todo, con amor.
                No pensé cuánto duraría esto o cuánto costaría esto, pero decidí
                confiar en mis sentimientos y en mi corazón.
              </p>
              <img src="/Heart.gif" alt="Heart" className="h-34 mx-auto" />
            </>
          )}

          {page === 2 && (
            <>
              <p className="text-center">
                A los largos de estos años he aprendido mucho de ti y tú de mí.
                Hemos pasado muchos bonitos y no tan bonitos momentos, pero a
                pesar de todo, seguimos aquí, haciendo valer más el amor que la
                adversidad. Por eso, en un día como hoy, celebro tener un amor
                tan bonito y tan especial como el tuyo, a pesar que haya
                momentos donde no lo demuestre, es algo que siempre está allí,
                en el fondo de mi corazón, en un lugar donde solo estás tú.
              </p>

              <img src="/Dogs.gif" alt="Dogs" className="h-34 mx-auto mt-2" />
            </>
          )}

          {page === 3 && (
            <>
              <span className="text-center">
                Hoy quiero decirte, que eres una persona fundamental para mí y
                te doy las gracias por estar ahí para mi sin importar el cuándo
                y el qué.
              </span>
              <span className="text-center">
                Gracias por ser motivación, por ser tranquilidad y por ser
                felicidad.
              </span>
              <br />
              <span className="text-center">Con mucho cariño, Lisandro.</span>
              <span className="text-center">¡Te amo!</span>
              <br />
              <img
                src="/SyL.jpg"
                alt="Scarlin y Lisandro"
                className="h-34 mx-auto"
              />
              <br />
              <span className="text-right">De: Lisandro</span>
              <span className="text-right">Para: Scarlin</span>
            </>
          )}
          <br />
          <div className="flex items-center justify-evenly">
            <button
              onClick={handleCloseModal}
              className="bg-red-600 cursor-pointer rounded-lg px-2 text-white sm:hover:bg-red-600/[.5]"
            >
              Cerrar
            </button>

            {page > 1 && (
              <button
                className="bg-red-600 cursor-pointer rounded-lg px-2 text-white sm:hover:bg-red-600/[.5]"
                onClick={() => setPage(page - 1)}
              >
                Volver
              </button>
            )}
            {page < 3 && (
              <button
                onClick={() => setPage(page + 1)}
                className="bg-red-600 cursor-pointer rounded-lg px-2 text-white sm:hover:bg-red-600/[.5]"
              >
                Continuar
              </button>
            )}
            {page === 3 && (
              <button
                onClick={() =>
                  window.open("/ValentinesDayLetter.pdf", "_blank")
                }
                className="bg-red-600 cursor-pointer rounded-lg px-2 text-white sm:hover:bg-red-600/[.5]"
              >
                Descargar
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;
