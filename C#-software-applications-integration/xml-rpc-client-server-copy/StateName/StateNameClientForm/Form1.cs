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

        private void butGetStateNames_Click(object sender, EventArgs e)
        {
            labStateNames1.Text = labStateNames2.Text = labStateNames3.Text = "";
            ProxyInterface svr = XmlRpcProxyGen.Create<ProxyInterface>();
            StateStructRequest request;
            string retstr = "";
            Cursor = Cursors.WaitCursor;
            try
            {
                request.state1 = Convert.ToInt32(txtStateNumber1.Text);
                request.state2 = Convert.ToInt32(txtStateNumber2.Text);
                request.state3 = Convert.ToInt32(txtStateNumber3.Text);
                retstr = svr.GetStateNames(request);
                String[] names = retstr.Split(',');
                if (names.Length > 2)
                    labStateNames3.Text = names[2];
                if (names.Length > 1)
                    labStateNames2.Text = names[1];
                if (names.Length > 0)
                    labStateNames1.Text = names[0];
            }
            catch (Exception ex)
            {
                HandleException(ex);
            }
            Cursor = Cursors.Default;
        }
    }
}
