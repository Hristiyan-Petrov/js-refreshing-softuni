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

namespace Client
{
    public partial class Form1 : Form
    {
        byte[] m_dataBuffer = new byte[10];
        IAsyncResult m_result;
        public AsyncCallback m_pfnCallBack;
        public Socket m_clientSocket;

        public Form1()
        {
            InitializeComponent();

            textBoxIP.Text = GetIP();
        }

        private void buttonConnect_Click(object sender, EventArgs e)
        {
            if (textBoxIP.Text == "" || textBoxPort.Text == "")
            {
                MessageBox.Show("IP Address and Port Number are required to connect
               to the Server\n");
 return;
            }
            try
            {
                UpdateControls(false);
                m_clientSocket = new Socket(AddressFamily.InterNetwork,
                SocketType.Stream, ProtocolType.Tcp);
                IPAddress ip = IPAddress.Parse(textBoxIP.Text);
                int iPortNo = System.Convert.ToInt16(textBoxPort.Text);
                IPEndPoint ipEnd = new IPEndPoint(ip, iPortNo);
                m_clientSocket.Connect(ipEnd);
                if (m_clientSocket.Connected)
                {
                    UpdateControls(true);
                    WaitForData();
                }
            }
            catch (SocketException se)
            {
                string str;
                str = "\nConnection failed, is the server running?\n" + se.Message;
                MessageBox.Show(str);
                UpdateControls(false);
            }
        }

        private void buttonClose_Click(object sender, EventArgs e)
        {
            if (m_clientSocket != null)
            {
                m_clientSocket.Shutdown(SocketShutdown.Both);
                m_clientSocket.Close();
                m_clientSocket = null;
            }
            Close();
        }

        private void buttonSendMessage_Click(object sender, EventArgs e)
        {
            try
            {
                Object objData = richTextTxMessage.Text;
                byte[] byData =
                System.Text.Encoding.ASCII.GetBytes(objData.ToString());
                if (m_clientSocket != null)
                {
                    m_clientSocket.Send(byData);
                }
            }
            catch (SocketException se)
            {
                MessageBox.Show(se.Message);
            }
        }

        public void WaitForData()
        {
            try
            {
                if (m_pfnCallBack == null)
                {
                    m_pfnCallBack = new AsyncCallback(OnDataReceived);
                }
                SocketPacket theSocPkt = new SocketPacket();
                theSocPkt.thisSocket = m_clientSocket;
                m_result = m_clientSocket.BeginReceive(theSocPkt.dataBuffer,
                0, theSocPkt.dataBuffer.Length,
               SocketFlags.None,
               m_pfnCallBack,
               theSocPkt);
            }
            catch (SocketException se)
            {
                MessageBox.Show(se.Message);
            }
        }

        public class SocketPacket
        {
            public System.Net.Sockets.Socket thisSocket;
            public byte[] dataBuffer = new byte[1];
        }

    }
}
