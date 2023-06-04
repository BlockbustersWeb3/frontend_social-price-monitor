import React from 'react'
import ProductBadge from './productBadge';
import ProductRating from './productRating'
import ProductGallery from './productGallery'
import ProductSizes from './productSizes'

function ProductOverview(props) {
  return (
    <>
    <div className="card card-product card-plain">
      {(props.images && props.images.length != 0) && 
      <ProductGallery images={props.images}/>
      }
      <div className="row mt-5">
        <div className="col-12 col-lg-8 border-end">
          {(props.title && props.title.length != 0) && 
            <h2>{props.title}</h2>
          }
          {(props.full_description && props.full_description.length != 0) && 
            <p>{props.full_description}</p>
          }
          {(props.highlights && props.highlights.length != 0) && 
           <>
             <h6>Highlights</h6>
              <ul className="text-sm">
              {props.highlights.map(highlight => 
                <li className="mb-2">{highlight}</li>
              )}
              </ul>
           </>
          }
           {(props.details && props.details.length != 0) && 
            <>
              <h6>Details</h6>
              <p>{props.details}</p>
            </>
           }

        </div>
        <div className="col-12 col-lg-4 ps-4">
          <form action="" method="post">
            {(props.price && props.price.length != 0) && 
            <div className="d-flex">
              <h3 className="font-weight-normal">${props.price.toFixed(2)}</h3>
              <input className="opacity-0" defaultValue={props.price} />
            </div>
            }
            {(props.rating != 0) && 
            <>
              <h3 className="sr-only">Reviews</h3>
              <ProductRating rating={props.rating} reviews={props.reviews} />
            </>
            }
            {(props.colors && props.colors.length != 0) && 
            <>
            <h6 className="mt-4">Colors:</h6>
            <div className="d-flex">
              {(props.colors) &&
                <ProductBadge colors={props.colors} />
              }
            </div>
            </>
            }
            
            {(props.sizes && props.sizes.size != 0) && 
              <ProductSizes sizes={props.sizes}/>
            }
            <button className="btn btn-primary btn-lg w-100" type="submit">Add to cart</button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductOverview