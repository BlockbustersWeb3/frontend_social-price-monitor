import React, { useState, useEffect, useRef } from 'react'
import '../store/firebase'
import { db } from '../store/firebase';
import { setProductSelected } from '../../storage/sesion'
import { collection, query, doc, getDocs, where, updateDoc } from "firebase/firestore";
import CardProduct from '../products/cardProduct';
import { addressWallet } from '/src/storage/sesion.js'

function CategoryFilter(props) {

  const [categories, setCategories] = useState("")
  const [products, setProducts] = useState([])
  const selectedCategories = useRef([])

  async function getCategories() {
    const q = query(collection(db, "categories"))
    const querySnapshot = await getDocs(q)
    let listOfCategories = []
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data()['title']);
      let category = {"id":doc.id, "title":doc.data()['title']}
      listOfCategories.push(category);
    });
    console.log(listOfCategories)
    setCategories(listOfCategories)
  }

  async function onChangeState(id){
    let checkBox = document.getElementById(id)
    if(checkBox.checked){
      let category = categories.filter(c=> c["id"] == id)
      selectedCategories.current.push(category[0]);
    }else{
      selectedCategories.current = selectedCategories.current.filter(function(c) {return c.id != id})
    }
    await getProducts()
  }

  async function getProducts() {
    let myQuery;
    console.log(selectedCategories.current.length)
    if(selectedCategories.current.length == 0){
      myQuery = query(collection(db, "products"));
    }else{
      let IDs = selectedCategories.current.map(function(c){return c.id})
      console.log(IDs)
      myQuery = query(collection(db, "products"), where("category", "in", IDs));
    }

    console.log("Getting products...")
    const querySnapshot = await getDocs(myQuery)
    let listOfProducts = []
    querySnapshot.forEach((p) => {
      let data = p.data()
      data['id'] = p.id
      listOfProducts.push(data);
    });
    
    setProducts(listOfProducts)
  }

  async function TrackProduct(id){
    console.log("Filter detecting tracking of product: ", id)
    console.log(addressWallet.value)
    console.log(addressWallet)

    const docRef = doc(db, 'users', '0xaD15200e1200388D6b6f642805FFe77214E2Bf31');
    await updateDoc(docRef, {
      tracking: id
    });
  }

  function ReportPrice(id){
    console.log("Reporting price of: "+id)
    setProductSelected(id)
    window.location.href = "/product"
  }

  useEffect(() => {
    getCategories().catch(console.error)
    getProducts().catch(console.error)
    return () => {}
  },[])
  
  // async function getDocument(){
  //   const docRef = doc(db, "categories", "1");
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // }

  return (
    <>
      <div className="card card-product card-plain">
        <div className="d-flex border-bottom pb-3">
          <h2 className="mb-3">Categories</h2>
        </div>
        <div className="row mt-5">
          <div className="col-12 col-md-4">
            <div className="accordion" id="accordionArrivals">

              <div className="accordion-item">
                <h5 className="accordion-header" id="headingFour">
                  <button className="accordion-button border-bottom font-weight-bold py-4" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                    Category
                    <i className="collapse-close fa fa-plus text-xs pt-1 position-absolute end-0 me-3" aria-hidden="true"></i>
                    <i className="collapse-open fa fa-minus text-xs pt-1 position-absolute end-0 me-3" aria-hidden="true"></i>
                  </button>
                </h5>
                <div id="collapseFour" className="accordion-collapse" aria-labelledby="headingFour" data-bs-parent="#accordionArrivals">
                  <div className="accordion-body text-sm opacity-8">
                    { categories != ""?
                        categories.map(function(c){
                          return(
                            <div className="form-check justify-content-start" key={c.id}>
                              <input className="form-check-input me-2" type="checkbox" value="" onChange={()=>{onChangeState(c.id)}} id={c.id} />
                              <label className="custom-control-label mb-0">{c.title}</label>
                            </div>
                          )
                        })
                      :
                        <></>
                    }
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="col-12 col-md-8">
            <div className="d-flex border border-3 rounded-3 border-dashed h-100">
              {
                products.length > 0?
                  products.map(product => 
                    // <div className="col-md-5 col-lg-5" key={product.id}>
                      <CardProduct
                        key={product.id}
                        id={product.id}
                        thumb_src = {product.thumb_src}
                        thumb_alt = {product.thumb_alt}
                        // color = {product.color}
                        // colors = {product.colors}
                        title = {product.title}
                        description = {product.description}
                        price = {product.price}
                        position = "center"
                        track = {TrackProduct}
                        report = {ReportPrice}
                      />
                    // </div>
                  )
                  :
                  <></>
              }
              {/* {data.products.map(product => 
                <div class="col-md-6 col-lg-3">
                  <CardProduct 
                    thumb_src = {product.thumb_src}
                    thumb_alt = {product.thumb_alt}
                    color = {product.color}
                    colors = {product.colors}
                    title = {product.title}
                    description = {product.description}
                    price = {product.price}
                    position = "center"
                  />
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryFilter