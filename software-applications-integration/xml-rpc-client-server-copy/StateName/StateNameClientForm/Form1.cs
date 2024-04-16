using System.Net;
using CookComputing.XmlRpc;

namespace StateNameClientForm
{
    public partial class wrapper : Form
    {
        public wrapper()
        {
            InitializeComponent();
        }
        private void HandleException(Exception ex)
        {
            string msgBoxTitle = "Error";
            try
            {
                throw ex;
            }
            catch (XmlRpcFaultException fex)
            {
                MessageBox.Show("Fault Response: " + fex.FaultCode + " " + fex.FaultString, msgBoxTitle, MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            catch (WebException webEx)
            {
                MessageBox.Show("WebException: " + webEx.Message, msgBoxTitle, MessageBoxButtons.OK, MessageBoxIcon.Error);
                if (webEx.Response != null) webEx.Response.Close();
            }
            catch (Exception excep)
            {
                MessageBox.Show(excep.Message, msgBoxTitle, MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void butGetStateName_Click(object sender, EventArgs e)
        {
            ProxyInterface svr = XmlRpcProxyGen.Create<ProxyInterface>();

            labStateName.Text = "";
            Cursor = Cursors.WaitCursor;
            try
            {
                int num = Convert.ToInt32(txtStateNumber.Text);
                labStateName.Text = svr.GetStateName(num);
            }
            catch (Exception ex)
            {
                HandleException(ex);
            }
            Cursor = Cursors.Default;
        }
    }
}
