using System.Web;
using System.Web.Mvc;

namespace proteo5.JSvn.Concept1
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
