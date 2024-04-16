using System.Runtime.Remoting;
using System.Runtime.Remoting.Channels;
using System.Runtime.Remoting.Channels.Http;
using CookComputing.XmlRpc;
using StateNameInterface;

namespace StateNameClient
{
    class Program
    {
        bool bUseSoap = false;
        if (args.Length > 0 && args[0] == 'SOAP')
            bUseSoap = true;
        HttpChannel chnl;
        if (bUseSoap)
            chnl = new HttpChannel();
        else
            chnl = new HttpChannel(null, new XmlRpcServerFormatterSinkProvider(), null);
    }

}
