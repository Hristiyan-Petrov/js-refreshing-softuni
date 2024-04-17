using CookComputing.XmlRpc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StateNameClientForm
{
    [XmlRpcUrl("http://localhost:5678/statename.rem")]
    public interface ProxyInterface : IXmlRpcProxy
    {
        [XmlRpcMethod("getStateName")]
        string GetStateName(int stateNumber);

        [XmlRpcMethod("getStateNames")]
        string GetStateNames(StateStructRequest request);
    }

    public struct StateStructRequest
    {
        public int state1;
        public int state2;
        public int state3;
    }