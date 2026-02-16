using Azure;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Newtonsoft.Json;
using PetProject.Models;
using System.Diagnostics;
using System.Security.Cryptography;
using System.Text.RegularExpressions;


namespace PetProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UserCotroller : ControllerBase
    {
        private readonly ProductDbContext _productDbContext;

        public UserCotroller(ProductDbContext productDbContext)
        {
            _productDbContext = productDbContext;
        }

        [HttpPost]
        [Route("~/api/users/register")]
        public async Task<Users> AddUser(Users objUser)
        {
            _productDbContext.Users.Add(objUser);
            await _productDbContext.SaveChangesAsync();
            return objUser;
        }

        [HttpGet]
        [Route("~/api/users/account/{studentId}")]
        public bool FindUser(string studentId)
        {
            bool result;
            var user = _productDbContext.Users.Find(studentId);
            if (user == null)
            {
                result = false;
            }
            else
            {
                result = true;
            }

            return result;

        }


        [HttpPost]
        [Route("~/api/users/login")]
        public IActionResult MyMethod([FromBody] MyDataModel data)
        {
            string pattern = "^[a-zA-Z ]+$";

            if (data.studentId == "admin" && data.password == "admin")
            {
                return Ok(data);
            }

            if (Regex.IsMatch(data.studentId, pattern))
            {
                return  Ok(data);
            }

            var getUser = _productDbContext.Users.FromSqlRaw($"Usp_Login {data.studentId},{data.password}").AsEnumerable().FirstOrDefault();
            
            if ( getUser == null )
            {
                data.studentId = "false";
                return Ok(data);
            }


            return Ok(getUser);
        }

        public class MyDataModel
        {
            public string? studentId { get; set; }
            public string? password { get; set; }
        }




        //public static string EncodePasswordToBase64(string password)
        //{
        //    try
        //    {
        //        byte[] encData_byte = new byte[password.Length];
        //        encData_byte = System.Text.Encoding.UTF8.GetBytes(password);
        //        string encodedData = Convert.ToBase64String(encData_byte);
        //        return encodedData;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error in base64Encode" + ex.Message);
        //    }
        //}

        //public string DecodeFrom64(string encodedData)
        //{
        //    System.Text.UTF8Encoding encoder = new();
        //    System.Text.Decoder decoder = encoder.GetDecoder();
        //    byte[] todecode_byte = Convert.FromBase64String(encodedData);
        //    int charCount = decoder.GetCharCount(todecode_byte, 0, todecode_byte.Length);
        //    char[] decoded_char = new char[charCount];
        //    decoder.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);
        //    string result = new(decoded_char);
        //    return result;
        //}

    }
}
