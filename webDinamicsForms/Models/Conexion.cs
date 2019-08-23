using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using webDinamicsForms.Estructura;
using System.Data.SqlClient;
using System.Data;


namespace webDinamicsForms.Models
{
    internal class Conexion
    {
        /// <summary>
        /// 
        /// </summary>
        private string _strConect = @"Data Source=donecg.sytes.net\FINANZAS,58290;Initial Catalog=GYGBDD;User ID=kai;Password=kaifer";
        /// <summary>
        /// 
        /// </summary>
        private string json { set; get; } = string.Empty;
        /// <summary>
        /// 
        /// </summary>
        private SqlDataReader _reader = null;
        /// <summary>
        /// 
        /// </summary>
        private SqlConnection _conect { set; get; }
        /// <summary>
        /// 
        /// </summary>
        private SqlCommand _comand { set; get; }
        /// <summary>
        /// 
        /// </summary>
        private SqlDataAdapter _dataAdapter { set; get; }
        /// <summary>
        /// 
        /// </summary>
        private DataSet _dataSet { set; get; }
        /// <summary>
        /// 
        /// </summary>
        private DataTable _tbl { set; get; }

        /// <summary>
        /// Lista de parametros obtenidos para cada sp que se selecciona
        /// </summary>
        private List<string> optSp = new List<string>();

        /// <summary>
        /// 
        /// </summary>
        private void start()
        {
            _conect = new SqlConnection(_strConect);
            _comand = new SqlCommand();
            _conect.Close();
            _comand.Connection = _conect;
            _comand.CommandType = CommandType.StoredProcedure;
            _comand.Parameters.Clear();
            _comand.CommandTimeout = 1000000000;
            _conect.Open();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        private string ConvertDataTabletoString(DataTable dt)
        {
            System.Web.Script.Serialization.JavaScriptSerializer serializer =
                new System.Web.Script.Serialization.JavaScriptSerializer();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            foreach (DataRow dr in dt.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(col.ColumnName, dr[col]);
                }

                rows.Add(row);
            }

            return serializer.Serialize(rows);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        private List<Dictionary<string, string>> convertDataTableToList(DataTable dt)
        {
            List<Dictionary<string, string>> rows = new List<Dictionary<string, string>>();
            Dictionary<string, string> row;
            foreach (DataRow dr in dt.Rows)
            {
                row = new Dictionary<string, string>();
                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(col.ColumnName, dr[col].ToString());
                }
                rows.Add(row);
            }
            return rows;
        }

        /// <summary>
        /// Obtiene los parametros del sp y los machea con los pasador por la vista
        /// </summary>
        /// <param name="paramsSP"></param>
        /// <param name="sp"></param>
        private void loadParamsSp(Dictionary<string, string> paramsSP, string sp)
        {
            sp = sp.Replace("dbo.", "").Replace("DBO.", "");
            optSp.Clear();
            _reader = null;
            start();
            _comand.CommandType = CommandType.Text;
            //una cadena estatica y despues remplazo un sp por el spque se nesesite
            _comand.CommandText = Configuracion.selectSP.Replace("[sp]", sp);
            _reader = _comand.ExecuteReader();
            while (_reader.Read())
            {
                optSp.Add(_reader["PARAMETER_NAME"].ToString().Replace("@", ""));
            }
            _conect.Close();
        }

        /// <summary>
        /// Metodo que se encarga de ejecutar los procedimientos almacenados y regresa una respuesta de la base de datos
        /// </summary>
        /// <param name="param">Clase en la que se almacenan os parametros que se nesesitan para elsp</param>
        /// <returns>una cadena con formato JSON </returns>
        public string execSP(ParametrosSp param)
        {
            _tbl = new DataTable();
            JsonRest _json = new JsonRest();
            try
            {
                if (param.Parametros.Count > 0)
                {
                    loadParamsSp(param.Parametros, param.Sp);
                }
                start();
                foreach (KeyValuePair<string, string> item in param.Parametros)
                {
                    if (optSp.Contains(item.Key))
                    {
                        _comand.Parameters.AddWithValue("@" + item.Key, item.Value);
                    }
                }
                _comand.CommandText = param.Sp;
                _dataAdapter = new SqlDataAdapter(_comand);
                _dataSet = new DataSet("Table");
                _dataAdapter.Fill(_dataSet);
                _conect.Close();
                foreach (DataTable tbl in _dataSet.Tables)
                {
                    if (tbl.Columns.Contains("bandera"))
                    {
                        _json.bandera = tbl.Rows[0][0].ToString();
                        _json.mensaje = tbl.Rows[0][1].ToString();
                    }
                    else
                    {
                        _json.data.Add("Table" + _json.data.Count.ToString(), convertDataTableToList(tbl));
                    }
                }
                return _json.ToString();
            }
            catch (Exception ex)
            {
                return new JsonRest(ex.Message, "-1").ToString();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public string execString(string param)
        {
            _tbl = new DataTable();
            JsonRest _json = new JsonRest();
            try
            {
                start();
                _comand.CommandType = CommandType.Text;
                _comand.CommandText = param;
                _dataAdapter = new SqlDataAdapter(_comand);
                _dataSet = new DataSet("Table");
                _dataAdapter.Fill(_dataSet);
                _conect.Close();
                foreach (DataTable tbl in _dataSet.Tables)
                {
                    if (tbl.Columns.Contains("bandera"))
                    {
                        _json.bandera = tbl.Rows[0][0].ToString();
                        _json.mensaje = tbl.Rows[0][1].ToString();
                    }
                    else
                    {
                        _json.data.Add("Table" + _json.data.Count.ToString(), convertDataTableToList(tbl));
                    }
                }
                return _json.ToString();
            }
            catch (Exception ex)
            {
                return new JsonRest(ex.Message, "-1").ToString();
            }
        }
    }
}