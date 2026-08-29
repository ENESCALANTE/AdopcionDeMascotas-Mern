import { useEffect, useState } from 'react';

function App() {
  const [mascotas, setMascotas] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    especie: '',
    edad: '',
    descripcion: '',
    imagen: ''
  });

  const API_URL = 'https://adopcion-de-mascotas-mern.vercel.app/';

  // Cargar mascotas al iniciar
  const obtenerMascotas = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMascotas(data))
      .catch((err) => console.error('Error al cargar mascotas:', err));
  };

  useEffect(() => {
    obtenerMascotas();
  }, []);

  // Manejar inputs del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Crear nueva mascota
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then(() => {
        obtenerMascotas();
        setFormData({ nombre: '', especie: '', edad: '', descripcion: '', imagen: '' });
      })
      .catch((err) => console.error('Error al agregar mascota:', err));
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 font-weight-bold">🐾 Adopción de Mascotas</h1>

      {/* Formulario de Registro */}
      <div className="card shadow-sm mb-5 p-4 bg-light">
        <h4 className="mb-3"><i className="bi bi-plus-circle-fill me-2"></i>Registrar Mascota</h4>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <input type="text" className="form-control" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" name="especie" placeholder="Especie (Perro, Gato...)" value={formData.especie} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <input type="number" className="form-control" name="edad" placeholder="Edad" value={formData.edad} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <input type="url" className="form-control" name="imagen" placeholder="URL Imagen (https://...)" value={formData.imagen} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <input type="text" className="form-control" name="descripcion" placeholder="Descripción breve" value={formData.descripcion} onChange={handleChange} required />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-success w-100">Guardar Mascota</button>
          </div>
        </form>
      </div>

      {/* Grilla de Mascotas */}
      <div className="row">
        {mascotas.length === 0 ? (
          <p className="text-center text-muted">No hay mascotas registradas aún o el backend está apagado.</p>
        ) : (
          mascotas.map((mascota) => (
            <div key={mascota._id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={mascota.imagen || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400'}
                  className="card-img-top"
                  alt={mascota.nombre}
                  style={{ height: '220px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{mascota.nombre}</h5>
                  <p className="card-text text-secondary mb-1">
                    <span className="badge bg-info text-dark me-2">{mascota.especie}</span>
                    {mascota.edad} {mascota.edad === 1 ? 'año' : 'años'}
                  </p>
                  <p className="card-text flex-grow-1 mt-2">{mascota.descripcion}</p>
                  <button className="btn btn-outline-primary w-100 mt-auto">
                    <i className="bi bi-heart-fill me-2"></i>Adoptar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;