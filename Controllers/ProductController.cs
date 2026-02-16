using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using PetProject.Models;

namespace PetProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductDbContext _productDbContext;

        public ProductController(ProductDbContext productDbContext)
        {
            _productDbContext = productDbContext;
        }

        [HttpGet]
        [Route("~/api/product/all")]
        public async Task<IEnumerable<Product>> GetProducts()
        {
            var products = await _productDbContext.Product.ToListAsync();

            if (products == null || products.Count == 0)
            { 
                return Enumerable.Empty<Product>(); 
            }

            return products;
        }

        [HttpPost]
        [Route("~/api/product/add")]
        public async Task<Product> AddProduct(Product objProduct)
        {
            _productDbContext.Product.Add(objProduct);
            await _productDbContext.SaveChangesAsync();
            return objProduct;
        }

        [HttpPut]
        [Route("~/api/product/update/{id}")]
        public bool UpdateProduct(Product objProduct)
        {
            var product = _productDbContext.Product.FirstOrDefault(data => data.id == objProduct.id);

            if (product == null)
            {
                return false;
            }

            product.productName = objProduct.productName;
            product.productType = objProduct.productType;
            product.productCategory = objProduct.productCategory;
            product.productPrice = objProduct.productPrice;

            _productDbContext.Product.Update(product);
            _productDbContext.SaveChanges();
            return true;
        }

        [HttpDelete]
        [Route("~/api/product/delete/{id}")]
        public bool DeleteProduct(int id)
        {   
            bool result;
            var product = _productDbContext.Product.Find(id);
            if (product != null)
            {
                result = true;
                _productDbContext.Entry(product).State = EntityState.Deleted;
                _productDbContext.SaveChanges();
            }
            else
            {
                result = false;
            }

            return result;
        }
    }
}
