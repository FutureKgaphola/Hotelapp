
import loadingimage from '../media/loading.gif';

const Skeleton = () => {
    var rendercount = [{
        id: '1'
    },
    {
        id: '2'
    },
    {
        id: '3'
    }
    ]
    return (
        <div className="col-lg-4" style={{ display: 'flex', margin: '5px', padding: '0', borderRadius: "0px 5px 5px 0px", backgroundColor: 'whitesmoke' }}>
            <div className="col" style={{ margin: '5px' }}>
                <div className="card-body">
                    <strong style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}><span style={{ color: '#306832', fontStyle: 'italic', fontSize: '20px' }}>...</span></strong>
                    <div style={{ background: 'rgba(51, 49, 49, 0.46)', borderRadius: '5px', padding: '5px' }}>
                        <ul>
                            <li style={{ color: 'white' }} >. x ...</li>
                            <li style={{ color: 'white' }} >. x ...</li>
                            <li style={{ color: 'white' }} >. x ...</li>
                        </ul>

                    </div>

                    <button style={{ borderRadius: '9px', margin: '5px', width: '65px', backgroundColor: 'white', borderColor: 'black', color: 'black' }} type="button" className="explore btn btn-sm">...</button>
                </div>
            </div>
            <div className="col">
                <img style={{ width: '100%', objectFit: 'contain', height: "100%", borderRadius: "0px 5px 5px 0px" }} src={loadingimage} alt="loading..." />
            </div>

            

        </div>

    );
}

export default Skeleton;