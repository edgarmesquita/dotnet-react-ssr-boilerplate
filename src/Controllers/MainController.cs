using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System;

namespace Example.Controllers
{
    public class MainController : BaseController
    {
        public MainController(IAntiforgery antiforgery) : base(antiforgery)
        {
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("language")]
        public IActionResult SetLanguage([FromQuery]string culture)
        {
            Response.Cookies.Append(
                CookieRequestCultureProvider.DefaultCookieName,
                CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)),
                new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) }
            );

            return Ok();
        }

        public IActionResult OnPostCreateEssentialAsync()
        {
            HttpContext.Response.Cookies.Append("EssentialSec",
                DateTime.Now.Second.ToString(),
                new CookieOptions() { IsEssential = true });

            TempData["ResponseCookies"] = Response.Headers[HeaderNames.SetCookie].ToString();

            return RedirectToPage("./");
        }
    }
}