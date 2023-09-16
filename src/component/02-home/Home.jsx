import { useState } from 'react';
import Modal from 'react-modal';
import { BsTools } from 'react-icons/bs';
import {GrLinkPrevious} from 'react-icons/gr'
import './index.css'
import { NavLink } from 'react-router-dom';

Modal.setAppElement('#root');

const Home = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [Turno, setTurno] = useState(false);
  const [numberTurno, setNumberTurno] = useState(1);
  const [tuTurno, setTuTurno] = useState(0)
  const [verTurno, setVerTurno] = useState(false)
  const [clienteInfo, setInfo] = useState ({
    nombre:'',
    telefono:'',
    dirección:'',
    servicios:[]
  })
  const [verInfo, setVerInfo] = useState(false);
  const [confirmar, setConfirmar] = useState(false)

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const turno = () => {
    setTuTurno(tuTurno + 1)
    setTurno(true);
    setModalIsOpen(false)
    setVerTurno(true)
  }
  
  const openModalTurno = () => {
    setTurno(true);
  };

  const closeModalTurno = () => {
    setTurno(false);
  };
  const cancelar = () => {
    setTuTurno(tuTurno-1);
    setTurno(false)
    setVerTurno(false)
    setInfo({
      nombre:'',
      telefono:'',
      dirección:'',
      servicios:[]
    })
  }
  const cambio = () => {
    setNumberTurno(numberTurno+1)
  }
  const cambio2 = () => {
    if(numberTurno>1){
      setNumberTurno(numberTurno-1)
    }
  }
  const onChange = async (e) => {
    const { name, value } = e.target;
    
    let updatedInfo = { ...clienteInfo };
  
    if (name === 'servicios') {
      if (!updatedInfo.servicios.includes(value)) {
        updatedInfo.servicios.push(value.toUpperCase());
      }
    } else {
      updatedInfo[name] = value.toUpperCase();
    }
  
    setInfo(updatedInfo);
  
    if (
      updatedInfo.nombre !== '' &&
      updatedInfo.telefono !== '' &&
      updatedInfo.dirección !== '' &&
      updatedInfo.servicios.length !== 0
    ) {
      setConfirmar(true);
    } else {
      setConfirmar(false);
    }
  };
  const mostrarInfo = () =>{
    setVerInfo(!verInfo)
  }
  console.log(clienteInfo.servicios)
  return (
    <div className='container-home'>
        <BsTools size={500} className='fondo'/>
        <h1 className='area'>Franco Ortíz</h1>
        <h3 className='subtitle'>TU TECNICO DE CONFIANZA</h3>
      <div className='container-button-home'>
        {
          tuTurno === 0?
            <button className='button1' 
              onClick={openModal}
            >
              Pedir Turno
            </button>:null
        }
        {
          verTurno?
          <button onClick={openModalTurno} className='button2'
          >Ver Turno
          </button>: null
        }
      </div>

      {modalIsOpen?
        <div className='modal1'>
          <button onClick={closeModal} className='modal-prev'>
            <GrLinkPrevious size={30} color='white' />
          </button>
          <label>Nombre y Apellido</label>
          <input placeholder='' name='nombre' onChange={onChange} value={clienteInfo.nombre}/>
          <label>Numero de contacto</label>
          <input placeholder='' name='telefono' onChange={onChange} value={clienteInfo.telefono}/>
          <label>Dirección</label>
          <input placeholder='' name='dirección' onChange={onChange} value={clienteInfo.dirección}/>
          <label>Servicios</label>
          <select name='servicios' onChange={onChange} >
            <option value="" hidden>Selecciona una opción</option>
            <option value="Consulta general">Consulta general</option>
            <option value="Pizza pluti">Pizza pluti</option>
            <option value="Me doy maña con el frio">Me doy maña con el frio</option>
            <option value="Arreglo el cosito que va el en coso">Arreglo el cosito que va el en coso</option>
            <option value="Promo hermanas">Promo hermanas</option>
          </select>
          {
            clienteInfo.servicios.length > 0 ? (
              <div className='service'>
                {clienteInfo.servicios.map((value) => (
                  <button key={value}>{value}</button>
                ))}
              </div>
            ) : null
          }
          <button onClick={turno} disabled={!confirmar} className={confirmar?'confirmar':'button-modal'}>Solicitar Turno</button>
        </div>:''
      }
      
    {Turno?
      <div className='modal2'>
        <button 
        className='close-button'
        onClick={closeModalTurno}
        >X</button>
        <button className='cambio' onClick={cambio}>Turno siguiente</button>
        <button className='cambio2' onClick={cambio2}>Turno anterior</button>
        <button className='info' onClick={mostrarInfo}>ver Info</button>
        {
          verInfo ?
            <div className='container-info'>
              <label>Nombre: {clienteInfo.nombre}</label>
              <label>Telefono: {clienteInfo.telefono}</label>
              <label>Dirección: {clienteInfo.dirección}</label>
              <label>Servicios</label>
              {
                clienteInfo.servicios.map((value)=>(
                  <div style={{display:'flex'}}>
                    <label>{value}</label>
                  </div>
                ))
              }
            </div>:''
        }
        <div className='container-ticket'>
          <div className='ticket'>
            <h2 style={{color:'green'}}>Turno Confirmado</h2>
            <h2 style={{color:'red'}}>Turno actual: N° {numberTurno}</h2>
            <h1>Turno</h1>
            <h1>N° {tuTurno}</h1>
          </div>
          <span className="flecha"/>
          <span className='flecha2'/>
        </div>
        {
          numberTurno === tuTurno ? <h2 className='mostrar'>Preparece para el placer...</h2>:''
        }
        <h4 className='mensaje'>El tecnico se pondra en contacto con usted entre el dia jueves o viernes para coordinar una visita</h4>
        <h4 className='mensaje'>Toda cancelación debe realizanrse 48 hs antes.</h4>
        <button className='cancelar' onClick={cancelar}>Cancelar Turno</button>
      </div>:''
    }
    </div>
  )
}

export default Home;
