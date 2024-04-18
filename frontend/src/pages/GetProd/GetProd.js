import React, { useState, useEffect } from "react";
import "./GetProd.css"; // Your custom CSS file
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS file
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CarLoader from "../../components/Spinners/CarLoader";

function GetProd() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add this line

  //getall product
  const getAllProdcuts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/prodget");
      setProducts(data.products);
      setIsLoading(false); // Add this line
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
      setIsLoading(false); // Add this line
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProdcuts();
  }, []);

  if (isLoading) {
    return <CarLoader />;
  }

  return (
    <>
      <div className="col-md-20">
        <h1 className="text-center">All Products List</h1>
        <div className="d-flex">
          {products?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
              <img
                className="card-img-top"
                src={`data:${p.img.contentType};base64,${btoa(
                  new Uint8Array(p.img.data.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                )}`}
                alt="Card_image_cap"
              />

              <div className="card-body">
                <h5 className="card-title">{p.Product_name}</h5>
                <p className="card-text">{p.Product_category}</p>
                <p className="card-text">{p.Product_price}</p>
                <p className="card-text">{p.Vendor_address}</p>
                <p className="card-text">{p.Product_quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default GetProd;
