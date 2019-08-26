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
        #region Vista
        public ActionResult Campos()
        {
            return View();
        }

        public ActionResult Formulario()
        {
            return View();
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Resultados()
        {
            return View();
        }

        public ActionResult Plantillas()
        {
            return View();
        }

        #endregion

        #region Metodos


        /// <summary>
        /// Evento encargado de salir de la session en curso y redireccionar al login
        /// </summary>
        /// <returns></returns>
        public ActionResult logout()
        {
            Session["IdProveedor"] = null;
            Session["tipoUser"] = null;
            return Json(new JsonRest("/Dinamic/Dinamic/Login", "1").ToString());
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
                        if (it.ContainsKey("idTipoUser"))
                        {
                            Session["idTipoUser"] = it["idTipoUser"];
                        }
                    }
                    obj.mensaje = "Index";//Dinamic/Dinamic/
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

        [HttpPost]
        public ActionResult saveFrm()
        {
            try
            {
                NameValueCollection datos = Request.Form;
                ParametrosSp param = new ParametrosSp();
                JsonRest rt = new JsonRest();
                string dropCreat = "USE [GYGBDD] \n  CREATE TABLE[dbo].[FRM_{item}]([id{item}][int] IDENTITY(1, 1) NOT NULL ",
                    item = "\n,[{item}] [varchar](500) NULL";

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

                if (param.Parametros.ContainsKey("nombre"))
                {
                    if (param.Parametros["nombre"].Length > 0)
                    {
                        dropCreat = dropCreat.Replace("{item}", param.Parametros["nombre"].Replace(" ", "_"));
                        if (param.Parametros.ContainsKey("FormHTML"))
                        {
                            List<JsonCampos> list = JsonConvert.DeserializeObject<List<JsonCampos>>(param.Parametros["FormHTML"]);
                            if (list.Count > 0)
                            {
                                foreach (JsonCampos i in list)
                                {
                                    dropCreat += item.Replace("{item}", i.text.Replace(" ", "_"));
                                }
                                dropCreat += ")";
                                param.Parametros.Add("sqlQ", dropCreat);
                                rt.Load(new Conexion().execSP(param));
                            }
                            else { rt.mensaje = "No contiene ningun ecampo"; rt.bandera = "-1"; }
                        }
                    }
                    else { rt.mensaje = "No tiene un nombre asignado"; rt.bandera = "-1"; }
                }
                return Json(rt.ToString());
            }
            catch (Exception ex)
            {
                return Json(new JsonRest(ex.Message, "-1").ToString());
                throw;
            }
        }

        public ActionResult saveResult()
        {
            try
            {
                NameValueCollection datos = Request.Form;
                ParametrosSp param = new ParametrosSp();
                JsonRest rt = new JsonRest();
                string ltsR = "", query = "INSERT INTO dbo.FRM_{item} ";

                foreach (string nA in datos.AllKeys)
                {
                    switch (nA)
                    {
                        case "sp":
                            param.Sp = datos["sp"].ToString();
                            break;
                        case "nombre":
                            query = query.Replace("{item}", datos["nombre"].ToString().Replace(" ", "_")) + " SELECT ";
                            break;
                        case "json":
                            ltsR = datos["json"].ToString();
                            break;
                        default:
                            param.Parametros.Add(nA, datos[nA].ToString());
                            break;
                    }
                }

                if (ltsR.Length > 0)
                {
                    List<JsonCampos> list = JsonConvert.DeserializeObject<List<JsonCampos>>(ltsR);
                    if (list.Count > 0)
                    {
                        bool flag = true;
                        foreach (JsonCampos i in list)
                        {
                            if (flag)
                            {
                                query += "'" + i.text + "'";
                                flag = false;
                            }
                            else { query += ",'" + i.text + "'"; }
                        }
                        rt.Load(new Conexion().execString(query));
                        if (rt.mensaje == "--")
                        {
                            rt.mensaje = "Resultados guardados correctamente";
                            rt.bandera = "1";
                        }
                    }
                }
                return Json(rt.ToString());
            }
            catch (Exception ex)
            {
                return Json(new JsonRest(ex.Message, "-1").ToString());
                throw;
            }
        }

        //public ActionResult obtenerTabla()
        //{
        //    try
        //    {
        //        NameValueCollection datos = Request.Form;
        //        ParametrosSp param = new ParametrosSp();
        //        JsonRest rt = new JsonRest();

        //        foreach (string nA in datos.AllKeys)
        //        {
        //            switch (nA)
        //            {
        //                case "sp":
        //                    param.Sp = datos["sp"].ToString();
        //                    break;
        //                default:
        //                    param.Parametros.Add(nA, datos[nA].ToString());
        //                    break;
        //            }
        //        }

        //        if (ltsR.Length > 0)
        //        {
        //            List<JsonCampos> list = JsonConvert.DeserializeObject<List<JsonCampos>>(ltsR);
        //            if (list.Count > 0)
        //            {
        //                bool flag = true;
        //                foreach (JsonCampos i in list)
        //                {
        //                    if (flag)
        //                    {
        //                        query += "'" + i.text + "'";
        //                        flag = false;
        //                    }
        //                    else { query += ",'" + i.text + "'"; }
        //                }
        //                rt.Load(new Conexion().execString(query));
        //                if (rt.mensaje == "--")
        //                {
        //                    rt.mensaje = "Resultados guardados correctamente";
        //                    rt.bandera = "1";
        //                }
        //            }
        //        }
        //        return Json(rt.ToString());
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new JsonRest(ex.Message, "-1").ToString());
        //        throw;
        //    }
        //}

        #endregion
    }
}