namespace Example.Models
{
    public class ConsentCookie
    {
        public string CookieName { get; set; }
        public bool CanTrack { get; set; }
    }
    /// <summary>
    /// Represents public session of the web application
    /// that can be shared in browser's window object.
    /// </summary>
    public class PublicSession
    {
        public ConsentCookie ConsentCookie { get; set; }
        public string XsrfToken { get; set; }
        public UserModel ServiceUser { get; set; }
    }
}
