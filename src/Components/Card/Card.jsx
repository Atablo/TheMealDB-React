import React from 'react';
import { Link } from 'react-router-dom';

export default function MealCard() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="row">
              <div className="col-sm-4">
                <img
                  src="https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2023/07/hamburguesa-3096800.jpg?tf=3840x"
                  className="h-100 card-img w-100"
                  alt="..."
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="col-sm-8">
                <div className="card-body">
                  <div className="d-flex justify-content-between shadow p-3 rounded-5">
                    <div className="bg-warning w-50 d-flex justify-content-center rounded-4 align-items-center">
                      <strong className="align-items-center type text-light">SIDE</strong>
                    </div>
                    <div className="w-50 d-flex justify-content-center align-items-center">
                      <div className="w-50 d-flex justify-content-center align-items-center d-none d-md-flex">
                        <strong className="fs-6 country">Ucrania</strong>
                      </div>
                      <img src="https://flagcdn.com/w20/ua.png" alt="" className="ml-2 mr-2 d-sm-flex countryFlag" />
                    </div>
                  </div>
                  <h5 className="card-title mt-3 d-flex justify-content-center">
                    <Link className="link-dark text-decoration-none text-center" to="/meal-details">
                      Hamburguesa de carne
                    </Link>
                  </h5>
                </div>
                <div className="row flex-wrap justify-content-center align-content-stretch shadow rounded-3 m-2 mt-3">
                  <h5 className="mb-4 bg-info-subtle rounded-2 p-2 text-center">Tags</h5>
                  <div className="tags d-flex flex-wrap justify-content-center align-items-center text-center rounded-3 tags-container py-4">
                    No tags
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
