using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CookComputing.XmlRpc;

namespace StateNameInterface
{
    public struct StateStructRequest
    {
        public int state1;
        public int state2;
        public int state3;
    }

    public interface IStateName
    {
        [XmlRpcMethod("getStateName")]
        string GetStateName(int stateNumber);

        [XmlRpcMethod("getStateNames")]
        string GetStateNames(StateStructRequest request);
    }
}
