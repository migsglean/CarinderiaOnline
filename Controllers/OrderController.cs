using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetProject.Models;
using System.Diagnostics;

namespace PetProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ProductDbContext _productDbContext;

        public OrderController(ProductDbContext productDbContext)
        {
            _productDbContext = productDbContext;
        }

        [HttpGet]
        [Route("~/api/order/all")]
        public async Task<IEnumerable<Order>> GetOrders()
        {
            var orders = await _productDbContext.Order.ToListAsync();

            if (orders == null || orders.Count == 0)
            {
                return Enumerable.Empty<Order>();
            }

            return orders;
        }


        [HttpPost]
        [Route("~/api/order/save")]
        public IActionResult Order(Order[] order) {

            foreach (var orderItem in order)
            {
                _productDbContext.Add(orderItem);
                _productDbContext.SaveChanges();
            }

            return Ok();
        }
    }
}
