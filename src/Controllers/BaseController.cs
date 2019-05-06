using Example.Models;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Example.Controllers
{
    public class BaseController : Controller
    {
        public IAntiforgery Antiforgery { get; }

        protected BaseController(IAntiforgery antiforgery)
        {
            Antiforgery = antiforgery;
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var tokens = Antiforgery.GetAndStoreTokens(context.HttpContext);
            ViewBag.AntiForgeryRequestToken = tokens.RequestToken;

            if (!string.IsNullOrWhiteSpace(tokens.RequestToken))
            {
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = false,
                    Secure = this.Request.IsHttps
                };
                this.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, cookieOptions);
            }
            var consentFeature = context.HttpContext.Features.Get<ITrackingConsentFeature>();
            var nodeSession = new NodeSession
            {
                Private = new PrivateSession
                {
                    Cookie = string.Join(", ", Request.Cookies.Select(x => $"{x.Key}={x.Value};"))
                },
                Public = new PublicSession
                {
                    ConsentCookie = new ConsentCookie {
                        CookieName = consentFeature?.CreateConsentCookie(),
                        CanTrack = consentFeature?.CanTrack ?? false
                    },
                    ServiceUser = null,
                    XsrfToken = tokens.RequestToken
                }
            };

            ViewBag.NodeSession = nodeSession;

            base.OnActionExecuting(context);
        }
    }
}
