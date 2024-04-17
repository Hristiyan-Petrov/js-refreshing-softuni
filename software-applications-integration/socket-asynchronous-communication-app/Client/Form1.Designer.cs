namespace Client
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.textBoxIP = new System.Windows.Forms.TextBox();
            this.textBoxPort = new System.Windows.Forms.TextBox();
            this.textBoxConnectStatus = new System.Windows.Forms.TextBox();
            this.richTextTxMessage = new System.Windows.Forms.RichTextBox();
            this.richTextRxMessage = new System.Windows.Forms.RichTextBox();
            this.buttonConnect = new System.Windows.Forms.Button();
            this.buttonDisconnect = new System.Windows.Forms.Button();
            this.buttonSendMessage = new System.Windows.Forms.Button();
            this.buttonClose = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 9);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(62, 16);
            this.label1.TabIndex = 0;
            this.label1.Text = "ServerIP:";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(12, 43);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(34, 16);
            this.label2.TabIndex = 1;
            this.label2.Text = "Port:";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(13, 116);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(128, 16);
            this.label3.TabIndex = 2;
            this.label3.Text = "Meesage To Server";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(290, 116);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(141, 16);
            this.label4.TabIndex = 3;
            this.label4.Text = "Message From Server";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(12, 392);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(114, 16);
            this.label5.TabIndex = 4;
            this.label5.Text = "Connection Status";
            // 
            // textBoxIP
            // 
            this.textBoxIP.Location = new System.Drawing.Point(115, 9);
            this.textBoxIP.Name = "textBoxIP";
            this.textBoxIP.Size = new System.Drawing.Size(137, 22);
            this.textBoxIP.TabIndex = 5;
            // 
            // textBoxPort
            // 
            this.textBoxPort.Location = new System.Drawing.Point(115, 43);
            this.textBoxPort.Name = "textBoxPort";
            this.textBoxPort.Size = new System.Drawing.Size(137, 22);
            this.textBoxPort.TabIndex = 6;
            this.textBoxPort.Text = "8000";
            // 
            // textBoxConnectStatus
            // 
            this.textBoxConnectStatus.Location = new System.Drawing.Point(132, 392);
            this.textBoxConnectStatus.Name = "textBoxConnectStatus";
            this.textBoxConnectStatus.Size = new System.Drawing.Size(101, 22);
            this.textBoxConnectStatus.TabIndex = 7;
            this.textBoxConnectStatus.Text = "Not Connected";
            // 
            // richTextTxMessage
            // 
            this.richTextTxMessage.Location = new System.Drawing.Point(12, 149);
            this.richTextTxMessage.Name = "richTextTxMessage";
            this.richTextTxMessage.Size = new System.Drawing.Size(240, 175);
            this.richTextTxMessage.TabIndex = 8;
            this.richTextTxMessage.Text = "";
            // 
            // richTextRxMessage
            // 
            this.richTextRxMessage.Location = new System.Drawing.Point(293, 149);
            this.richTextRxMessage.Name = "richTextRxMessage";
            this.richTextRxMessage.Size = new System.Drawing.Size(206, 217);
            this.richTextRxMessage.TabIndex = 9;
            this.richTextRxMessage.Text = "";
            // 
            // buttonConnect
            // 
            this.buttonConnect.Location = new System.Drawing.Point(337, 12);
            this.buttonConnect.Name = "buttonConnect";
            this.buttonConnect.Size = new System.Drawing.Size(162, 23);
            this.buttonConnect.TabIndex = 10;
            this.buttonConnect.Text = "Connect To Server";
            this.buttonConnect.UseVisualStyleBackColor = true;
            this.buttonConnect.Click += new System.EventHandler(this.buttonConnect_Click);
            // 
            // buttonDisconnect
            // 
            this.buttonDisconnect.Location = new System.Drawing.Point(337, 43);
            this.buttonDisconnect.Name = "buttonDisconnect";
            this.buttonDisconnect.Size = new System.Drawing.Size(162, 23);
            this.buttonDisconnect.TabIndex = 11;
            this.buttonDisconnect.Text = "Disconnect From Server";
            this.buttonDisconnect.UseVisualStyleBackColor = true;
            this.buttonDisconnect.Click += new System.EventHandler(this.buttonDisconnect_Click);
            // 
            // buttonSendMessage
            // 
            this.buttonSendMessage.Location = new System.Drawing.Point(58, 343);
            this.buttonSendMessage.Name = "buttonSendMessage";
            this.buttonSendMessage.Size = new System.Drawing.Size(143, 23);
            this.buttonSendMessage.TabIndex = 12;
            this.buttonSendMessage.Text = "Send Message";
            this.buttonSendMessage.UseVisualStyleBackColor = true;
            this.buttonSendMessage.Click += new System.EventHandler(this.buttonSendMessage_Click);
            // 
            // buttonClose
            // 
            this.buttonClose.Location = new System.Drawing.Point(387, 390);
            this.buttonClose.Name = "buttonClose";
            this.buttonClose.Size = new System.Drawing.Size(112, 23);
            this.buttonClose.TabIndex = 13;
            this.buttonClose.Text = "Close";
            this.buttonClose.UseVisualStyleBackColor = true;
            this.buttonClose.Click += new System.EventHandler(this.buttonClose_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(511, 450);
            this.Controls.Add(this.buttonClose);
            this.Controls.Add(this.buttonSendMessage);
            this.Controls.Add(this.buttonDisconnect);
            this.Controls.Add(this.buttonConnect);
            this.Controls.Add(this.richTextRxMessage);
            this.Controls.Add(this.richTextTxMessage);
            this.Controls.Add(this.textBoxConnectStatus);
            this.Controls.Add(this.textBoxPort);
            this.Controls.Add(this.textBoxIP);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.TextBox textBoxIP;
        private System.Windows.Forms.TextBox textBoxPort;
        private System.Windows.Forms.TextBox textBoxConnectStatus;
        private System.Windows.Forms.RichTextBox richTextTxMessage;
        private System.Windows.Forms.RichTextBox richTextRxMessage;
        private System.Windows.Forms.Button buttonConnect;
        private System.Windows.Forms.Button buttonDisconnect;
        private System.Windows.Forms.Button buttonSendMessage;
        private System.Windows.Forms.Button buttonClose;
    }
}

