using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
using PetProject.Models;
using System.Diagnostics;

namespace PetProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ProductDbContext _productDbContext;

        public CartController(ProductDbContext productDbContext)
        {
            _productDbContext = productDbContext;
        }

        [HttpGet]
        [Route("~/api/cart/all")]
        public async Task<IEnumerable<Cart>> GetCarts([System.Web.Http.FromUri] string studentId)
        {
            var cart = await _productDbContext.Carts.Where(e => e.studentId == studentId).ToListAsync();

            if (cart == null || cart.Count == 0)
            {
                return Enumerable.Empty<Cart>();
            }

            return cart;
        }

        [HttpPut]
        [Route("~/api/cart/update")]
        public bool UpdateCart(Cart objProduct)
        {
            var userProduct = _productDbContext.Carts.Where(e => e.studentId == objProduct.studentId && e.productId == objProduct.productId).FirstOrDefault();

            if (userProduct == null)
            {
                return false;
            }

            userProduct.quantity = objProduct.quantity;
            _productDbContext.Carts.Update(userProduct);
            _productDbContext.SaveChanges();
            return true;
        }

        [HttpDelete]
        [Route("~/api/cart/delete/{productId}")]
        public bool DeleteCart(Cart objProduct)
        {
            var userProduct = _productDbContext.Carts.Where(e => e.studentId == objProduct.studentId && e.productId == objProduct.productId).ToList();

            if ( userProduct == null) { return false; }

            _productDbContext.RemoveRange(userProduct);
            _productDbContext.SaveChanges();
            return true;
        }

        [HttpDelete]
        [Route("~/api/cart/delete")]
        public bool DeleteProduct([System.Web.Http.FromUri] string studentId)
        {
            bool result;
            var cart = _productDbContext.Carts.Where(e => e.studentId == studentId).ToList();
            if (cart != null)
            {
                result = true;
                _productDbContext.RemoveRange(cart);
                _productDbContext.SaveChanges();
            }
            else
            {
                result = false;
            }

            return result;
        }

        [HttpPost]
        [Route("~/api/cart/add")]
        public async Task<Cart> AddProduct(Cart objProduct)
        {
            //find specific user result array
            var user = _productDbContext.Carts.Where(e => e.studentId == objProduct.studentId).ToList();
            //find specific product result array
            var product = _productDbContext.Carts.Where(e => e.productId == objProduct.productId).ToList();

            //find specific user with and product
            var userProduct = _productDbContext.Carts.Where(e => e.studentId == objProduct.studentId && e.productId == objProduct.productId).ToList();

            //find specific user, status and product
            var updateProduct = _productDbContext.Carts.Where(e => e.productId == objProduct.productId && e.studentId == objProduct.studentId && e.status == objProduct.status).FirstOrDefault();


            if (user.Count() < 1)
            {
                _productDbContext.Carts.Add(objProduct);
                await _productDbContext.SaveChangesAsync();
                return objProduct;
            } else
            {
                if (product.Count() < 1)
                {
 
                    _productDbContext.Carts.Add(objProduct);
                    await _productDbContext.SaveChangesAsync();
                    return objProduct;
                } 
                else if (userProduct.Count() < 1) {
                    _productDbContext.Carts.Add(objProduct);
                    await _productDbContext.SaveChangesAsync();
                    return objProduct;
                }
                else
                {
                    updateProduct.quantity = updateProduct.quantity + objProduct.quantity;
                    _productDbContext.Carts.Update(updateProduct);
                    _productDbContext.SaveChanges();
                    return objProduct;
                }
            }
        }
    }
}
