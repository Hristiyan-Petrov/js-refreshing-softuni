using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net;
using System.Net.Sockets;

namespace Server
{
    public partial class Form1 : Form
    {
        const int MAX_CLIENTS = 10;

        public AsyncCallback pfnWorkerCallBack;
        private Socket m_mainSocket;
        private Socket[] m_workerSocket = new Socket[10];
        private int m_clientCount = 0;
        public Form1()
        {
            InitializeComponent();

            // Set the text of the textBoxIP control to your local IP.
            textBoxIP.Text = GetIP();
        }

        private void buttonStartListen_Click(object sender, EventArgs e)
        {
            try
            {
                if (textBoxPort.Text == "")
                {
                    MessageBox.Show("Please enter a Port Number");
                    return;
                }
                string portStr = textBoxPort.Text;
                int port = System.Convert.ToInt32(portStr);
                m_mainSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                IPEndPoint ipLocal = new IPEndPoint(IPAddress.Any, port);
                m_mainSocket.Bind(ipLocal);
                m_mainSocket.Listen(4);
                m_mainSocket.BeginAccept(new AsyncCallback(OnClientConnect), null);
                UpdateControls(true);
            }
            catch (SocketException se)
            {
                MessageBox.Show(se.Message);
            }
        }

        private void UpdateControls(bool listening)
        {
            buttonStartListen.Enabled = !listening;
            buttonStopListen.Enabled = listening;
        }
    }
}
