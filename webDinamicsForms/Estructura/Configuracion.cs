using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webDinamicsForms.Estructura
{
    public class Configuracion
    {
        /// <summary>
        /// Ruta donde se guardaran los archivos de las ordenes de compra
        /// </summary>
        static string _rutaArchivos = "EISENMAN/Files";
        public static string RutaArchivos
        {
            get
            {
                return _rutaArchivos;
            }
        }

        /// <summary>
        /// Ruta ddonde se guardaran los archivos de manera temporal para su descarga por los usuarios; el contenido de esta carpeta se puede borrar sin problema
        /// </summary>
        static string _rutaDescargas = "EISENMAN/Files/_temp/";
        public static string RutaDescargas
        {
            get
            {
                return _rutaDescargas;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        static string _selectSP = "SELECT PARAMETER_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH FROM INFORMATION_SCHEMA.PARAMETERS WHERE SPECIFIC_NAME = '[sp]'";
        public static string selectSP
        {
            get
            {
                return _selectSP;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        static string _rutaXml = "EISENMAN/Files/xmlVal/";// @"C:\Facturas3.3\";
        public static string RutaXml
        {
            get
            {
                return _rutaXml;
            }
        }

    }
}