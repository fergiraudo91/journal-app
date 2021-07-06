import cloudinary from 'cloudinary'
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'dpezd0bbw', 
    api_key: '278245421649363', 
    api_secret: 'IKjuLOExIvRGQsgxn5ENDnnoCew'
  });

describe("Pruebas en fileUpload", () => {
  test("Debe de cargar un archivo y retornar el URL", async (done) => {
    const resp = await fetch(
      "https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/10-Free-To-Use-CORS-Proxies-1024x768.png"
    );
    const blob = await resp.blob();
    const file = new File([blob], 'Foto.png');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    //Borrar imagen por ID
    const segments = url.split('/');
    const imgID = segments[segments.length - 1].replace('.png', '');

    cloudinary.v2.api.delete_resources(imgID, {}, () => {
        done();
    }, 20000);

  });

  test("Debe retornar un error", async () => {

    const file = new File([], 'Foto.png');
    const url = await fileUpload(file);

    expect(url).toBe(null);

  });


});
