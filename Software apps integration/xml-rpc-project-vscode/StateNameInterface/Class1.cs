using CookComputing.XmlRpc;

namespace StateNameInterface
{
    public interface IStateName
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
}