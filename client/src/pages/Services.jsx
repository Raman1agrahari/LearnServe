 import  {useAuth} from "../store/auth";

export const Services = () => {

  const {services} = useAuth();
 

  return (
     <section className="section-services">
      <div className="container">
         <h1 className="main-heading">Services</h1>
      </div>

      <div className="container grid grid-three-cols">
        {
          services.map((currentElement, index) => {
            const {price,description,provider,service} = currentElement;

        return(
          <div className="card" key={index}>
          <div className="card-img">
            <img src="/images/design.png" alt="our services info" width="200"/>
          </div>
          <div className="card-details">
            <div className="grid grid-two-cols">
              <p>{provider}</p>
              <p>{price}</p>
            </div>
            <h2>{service}</h2>
            <p className="description">{description}</p>
          </div>
        </div>
        );
         })
        }
      
      </div>
     </section>

  );
};
