using Microsoft.AspNetCore.Mvc;
using PetProject.Models;
using System.Diagnostics;

namespace PetProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly ProductDbContext _productDbContext;

        public ImageController(ProductDbContext productDbContext)
        {
            _productDbContext = productDbContext;
        }

        [HttpPost]
        [Route("~/api/image/add")]
        public async Task<IActionResult> SaveImage(Image imageModel)
        {
            //if (imageModel == null || imageModel.ImageData == null || imageModel.ImageData.Length <= 0)
            //{
            //    return BadRequest("Invalid image data");
            //}

            //_productDbContext.Images.Add(imageModel);
            //await _productDbContext.SaveChangesAsync();
            //return Ok("Image saved successfully");
            Debug.WriteLine(imageModel);

            return Ok();
        }

    }
}
