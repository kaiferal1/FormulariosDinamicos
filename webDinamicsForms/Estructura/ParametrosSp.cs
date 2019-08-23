using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webDinamicsForms.Estructura
{
    public class ParametrosSp
    {

        private string _Sp = "";
        /// <summary>
        /// opcion ya no usuada ya no usar
        /// </summary>
        //private int _Opt = 0;
        private int _Correo = 0;
        private Dictionary<string,string> _Parametros = new Dictionary<string, string>();

        public string Sp
        {
            get
            {
                return this._Sp;
            }
            set
            {
                this._Sp = value;
            }
        }

        /// <summary>
        /// opcion ya no usuada ya no usar
        /// </summary>
        //public int Opt
        //{
        //    get
        //    {
        //        return this._Opt;
        //    }
        //    set
        //    {
        //        this._Opt = value;
        //    }
        //}

        public int Correo
        {
            get
            {
                return this._Correo;
            }
            set
            {
                this._Correo = value;
            }
        }

        public Dictionary<string,string> Parametros
        {
            get
            {
                return this._Parametros;
            }
            set
            {
                this._Parametros = value;
            }
        }

    }
}