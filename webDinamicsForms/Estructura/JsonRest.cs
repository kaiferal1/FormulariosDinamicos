using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace webDinamicsForms.Estructura
{
    public class JsonRest
    {
        /// <summary>
        /// Constructor de la clase
        /// </summary>
        public JsonRest()
        {
        }

        public JsonRest(string json)
        {
            this.Load(json);
        }

        /// <summary>
        /// Constructor de la clase y se asignan de inicio el mensaje y la bandera
        /// </summary>
        /// <param name="msg">Mensaje informativo que se mostrara al usuario</param>
        /// <param name="flag">Indica si es un error o todo esta bien durante el procedimiento</param>
        public JsonRest(string msg, string flag)
        {
            _bandera = flag;
            _mensaje = msg;
        }

        private string _bandera = "0";
        private string _mensaje = "--";
        private Dictionary<string, List<Dictionary<string, string>>> _data = new Dictionary<string, List<Dictionary<string, string>>>();

        public string bandera
        {
            get
            {
                return this._bandera;
            }
            set
            {
                this._bandera = value;
            }
        }

        public string mensaje
        {
            get
            {
                return this._mensaje;
            }
            set
            {
                this._mensaje = value;
            }
        }

        public Dictionary<string, List<Dictionary<string, string>>> data
        {
            get
            {
                return this._data;
            }
            set
            {
                this._data = value;
            }
        }

        public bool Load(string json)
        {
            bool flag = true;
            try
            {
                if (json != "" && json != null)
                {
                    JsonRest o = JsonConvert.DeserializeObject<JsonRest>(json);
                    this.bandera = o.bandera;
                    this.mensaje = o.mensaje;
                    this.data.Clear();
                    this.data = o.data;
                }
                else { flag = false; }
                return flag;
            }
            catch (Exception e) { flag = false; return flag; }
        }

        public override string ToString()
        {
            if (this.mensaje.Length == 0)
            {
                this.mensaje = "--";
            }
            if (this.bandera.Length == 0)
            {
                this.bandera = "0";
            }
            return JsonConvert.SerializeObject(this);
        }

    }

    public class JsonCampos
    {
        private string _id = "0";
        private string _text = "--";

        public string id
        {
            get
            {
                return this._id;
            }
            set
            {
                this._id = value;
            }
        }

        public string text
        {
            get
            {
                return this._text;
            }
            set
            {
                this._text = value;
            }
        }
    }
}