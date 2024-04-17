import React, { useState, useEffect } from "react";
import "./GetProd.css";
import axios from "axios";
import { toast } from "react-hot-toast";
function GetProd() {
  const [products, setProducts] = useState([]);

  //getall product
  const getAllProdcuts = async () => {
    try {
      const { data } = await axios.get("/prodget");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProdcuts();
  }, []);

  return (
    <>
      <div className="col-md-9">
        <div className="text-center">All Products List</div>
        {products?.map((p) => (
          <div className="card" style={{ width: "18rem" }}>
            <img className="card-img-top" src="" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">{p.Product_name}</h5>
              <p className="card-text">hello</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default GetProd;
