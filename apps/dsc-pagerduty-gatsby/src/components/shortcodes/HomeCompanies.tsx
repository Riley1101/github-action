import { graphql, useStaticQuery } from "gatsby";
import { strapiRoute } from "../../utils/helpers";

const HomeCompanies = () => {
  const data = useStaticQuery(graphql`
    {
      strapi {
        topPage {
          data {
            attributes {
              companies
            }
          }
        }
      }
    }
  `);

  return (
    <div className="testomonial-section">
      <div className="testomonial-header">
        <h3>導入企業</h3>
      </div>
      <div className="testomonial-banner px-[25px]">
        {data.strapi.topPage.data.attributes.companies
          .split(", ")
          .sort(() => 0.5 - Math.random())
          .slice(0, 5)
          .map((comp, i) => (
            <div key={i} className="testomonial-banner-item" style={{
              wordBreak: "break-all",
              overflowWrap: "break-word",
              whiteSpace: "pre-line"
            }}>
              {comp}
            </div>
          ))}
        <div className="category-triangle top-[100%] left-[50%] -translate-y-[50%] -translate-x-[50%] w-[120px] h-[64px]">
          <img
            className="h-[64px] w-[120px]"
            src={strapiRoute('/uploads/triangle_Green_d15e11af0c.png')}
            alt="Green Triangle"
          />
        </div>
      </div>
      <div className="testomonial-img-container gap-[40px]">
        <div className="testomonial-img-wrapper w-[45%] md:w-[30%]">
          <img
            className="img min-h-[78px] w-[188px]"
            src={strapiRoute('/uploads/testomonial_Img1_a07b700708.png')}
            alt="Testimonial 1"
          />
        </div>
        <div className="testomonial-img-wrapper w-[45%] md:w-[30%]">
          <img
            className="img min-h-[78px] w-[161px]"
            src={strapiRoute('/uploads/testomonial_Img2_b3c9efd40f.png')}
            alt="Testimonial 2"
          />
        </div>
        <div className="testomonial-img-wrapper w-[45%] md:w-[30%]">
          <img
            className="img min-h-[78px] w-[165px]"
            src={strapiRoute('/uploads/testomonial_Img3_280a537a12.png')}
            alt="Testimonial 3"
          />
        </div>
        <div className="testomonial-img-wrapper w-[45%] md:w-[30%]">
          <img
            className="img min-h-[78px] w-[94px]"
            src={strapiRoute('/uploads/testomonial_Img4_02d9d7233b.png')}
            alt="Testimonial 4"
          />
        </div>
        <div className="testomonial-img-wrapper w-[45%] md:w-[30%]">
          <img
            className="img min-h-[78px] w-[153px]"
            src={strapiRoute('/uploads/testomonial_Img5_eef6a67b22.png')}
            alt="Testimonial 5"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeCompanies;
