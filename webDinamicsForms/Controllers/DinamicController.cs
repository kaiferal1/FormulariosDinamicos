using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;



using Newtonsoft.Json;
using System.Collections.Specialized;
using webDinamicsForms.Estructura;
using webDinamicsForms.Models;



namespace webDinamicsForms.Controllers
{
    public class DinamicController : Controller
    {
        
        public ActionResult Campos() {
            return View();
        }

        public ActionResult Formulario()
        {
            return View();
        }

        public ActionResult Index() {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        #region Metodos


        /// <summary>
        /// Evento encargado de salir de la session en curso y redireccionar al login
        /// </summary>
        /// <returns></returns>
        public ActionResult logout()
        {
            Session["IdProveedor"] = null;
            Session["tipoUser"] = null;
            return Json(new JsonRest("/webDinamicsForms/Dinamic/Login", "1").ToString());
        }

        /// <summary>
        /// Metodo para verificar la informacion dada y acceder con los permisos corespondientes
        /// </summary>
        /// <returns></returns>
        public ActionResult loginUsers()
        {
            try
            {
                NameValueCollection datos = Request.Form;
                ParametrosSp param = new ParametrosSp();
                string rest = string.Empty;
                param.Sp = "Usuarios_CRUD";
                foreach (string nA in datos.AllKeys)
                {
                    if (nA != "sp")
                    {
                        param.Parametros.Add(nA, datos[nA].ToString());
                    }
                }
                rest = new Conexion().execSP(param);
                JsonRest obj = new JsonRest();
                obj.Load(rest);
                if (obj.bandera == "1")
                {
                    foreach (Dictionary<string, string> it in obj.data["Table0"])
                    {
                        if (it.ContainsKey("idMunicipio"))
                        {
                            Session["idMunicipio"] = it["idMunicipio"];
                        }
                    }
                    obj.mensaje = "/webDinamicsForms/Dinamic/Index";

                    if (obj.data.ContainsKey("Table1"))
                    {
                        Session["json"] = JsonConvert.SerializeObject(obj.data["Table1"]);
                    }
                }
                return Json(obj.ToString());
            }
            catch (Exception ex)
            {
                return Json(new JsonRest(ex.Message, "-1").ToString());
                throw;
            }
        }


        /// <summary>
        /// /
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult ejecutarSP()
        {
            try
            {
                NameValueCollection datos = Request.Form;
                ParametrosSp param = new ParametrosSp();
                foreach (string nA in datos.AllKeys)
                {
                    switch (nA)
                    {
                        case "sp":
                            param.Sp = datos["sp"].ToString();
                            break;
                        default:
                            param.Parametros.Add(nA, datos[nA].ToString());
                            break;
                    }
                }
                string rest = new Conexion().execSP(param);
                return Json(rest);
            }
            catch (Exception ex)
            {
                return Json(new JsonRest(ex.Message, "-1").ToString());
                throw;
            }
        }


        #endregion

    }
}
