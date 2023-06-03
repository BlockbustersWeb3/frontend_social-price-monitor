import ProductBadge from './productBadge';

interface Props {
  thumb_src: string;
  thumb_alt: string;
  title: string;
  description: string;
  price: number;
  color: string;
  colors: string[];
  position: string;
}

export default function CardProduct({
  thumb_src,
  thumb_alt,
  title,
  description,
  price,
  color,
  colors,
  position,
  id,
  track,
  report
}: Props) {

  const classList = "card-body " + "text-" + position;

  async function onClickTrack(){
    console.log("Tracking proudct: ", id)
    track(id)
  }

  function onClickReport(){
    console.log("Report button clicked")
    report(id)
  }

  return (
    <>
      <div className="card card-product border border-white mb-4 shadow-xs">
        <a href="#">
          <div className="height-150">
            <img className="w-100 h-100 rounded-top" src={thumb_src} alt={thumb_alt} />
          </div>
          <div className={classList}>
            {(color) && 
              <p className="text-sm mb-1 text-body">{color}</p>
            }
            {(title) && 
              <h5 className="font-weight-bold">
                {title}
              </h5>
            }

            {(description) && 
              <p className="text-body text-sm">{description}</p>
            }
           
            {(price) && 
              <p className="mb-0 text-sm text-body mt-1 mb-3">
                ${price.toFixed(2)}
              </p>
            }
           
            {/* {(colors) &&
              <ProductBadge colors={colors} />
            } */}

            {/* {!(description || colors || color) &&
              <a href="#" className="font-weight-normal text-body text-sm">Shop Now</a>
            } */}
            <button className="btn btn-dark me-2" type="button" onClick={onClickReport}>Report</button>
            <button className="btn btn-dark me-2" type="button" onClick={onClickTrack}>Track</button>
          </div>
        </a>
      </div>
    </>
  );
};
