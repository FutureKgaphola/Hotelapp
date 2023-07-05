
import loadingimage from '../media/loading.gif';

const Skeleton = () => {

    return (
        <div className='row'>
            <div className="col-lg-4 boxskeleton" style={{ display: 'flex', margin: '5px', padding: '0', borderRadius: "0px 5px 5px 0px", backgroundColor: 'whitesmoke' }}>
                <div className="col" style={{ margin: '5px' }}>
                    <div className="card-body">
                        <div className='loading'>
                            <span style={{ fontStyle: 'italic', fontSize: '20px' }}></span>
                            <span style={{ fontStyle: 'italic', fontSize: '20px' }}></span>
                            <span style={{ fontStyle: 'italic', fontSize: '20px' }}></span>
                        </div>
                        <div style={{ background: 'rgba(51, 49, 49, 0.46)', borderRadius: '5px', padding: '5px' }}>
                            <ul>
                                <li style={{ color: 'white' }} >. x ...</li>
                                <li style={{ color: 'white' }} >. x ...</li>
                                <li style={{ color: 'white' }} >. x ...</li>
                            </ul>

                        </div>

                        <button disabled style={{ borderRadius: '9px', margin: '5px', width: '65px', backgroundColor: 'white', borderColor: 'black', color: 'black' }} type="button" className="explore btn btn-sm">...</button>
                    </div>
                </div>
                <div className="col">
                    <img style={{ width: '70%', objectFit: 'contain', height: "100%", borderRadius: "0px 5px 5px 0px" }} src={loadingimage} alt="loading..." />
                </div>

            </div>
            <div className="col-lg-4 boxskeleton" style={{ display: 'flex', margin: '5px', padding: '0', borderRadius: "0px 5px 5px 0px", backgroundColor: 'whitesmoke' }}>
                <div className="col" style={{ margin: '5px' }}>
                    <div className="card-body">
                        <div className='loading'>
                            <span style={{ fontStyle: 'italic', fontSize: '20px' }}></span>
                            <span style={{ fontStyle: 'italic', fontSize: '20px' }}></span>
                            <span style={{ fontStyle: 'italic', fontSize: '20px' }}></span>
                        </div>
                        <div style={{ background: 'rgba(51, 49, 49, 0.46)', borderRadius: '5px', padding: '5px' }}>
                            <ul>
                                <li style={{ color: 'white' }} >. x ...</li>
                                <li style={{ color: 'white' }} >. x ...</li>
                                <li style={{ color: 'white' }} >. x ...</li>
                            </ul>

                        </div>

                        <button disabled style={{ borderRadius: '9px', margin: '5px', width: '65px', backgroundColor: 'white', borderColor: 'black', color: 'black' }} type="button" className="explore btn btn-sm">...</button>
                    </div>
                </div>
                <div className="col">
                    <img style={{ width: '70%', objectFit: 'contain', height: "100%", borderRadius: "0px 5px 5px 0px" }} src={loadingimage} alt="loading..." />
                </div>

            </div>

            <div className="col-lg-4 boxskeleton" style={{ display: 'flex', margin: '5px', padding: '0', borderRadius: "0px 5px 5px 0px", backgroundColor: 'whitesmoke' }}>
                <div className="col" style={{ margin: '5px' }}>
                    <div className="card-body">
                        <div className='loading'>
                            <span style={{ fontStyle: 'italic', fontSize: '20px' }}></span>
                            <span style={{ fontStyle: 'italic', fontSize: '20px' }}></span>
                            <span style={{ fontStyle: 'italic', fontSize: '20px' }}></span>
                        </div>
                        <div style={{ background: 'rgba(51, 49, 49, 0.46)', borderRadius: '5px', padding: '5px' }}>
                            <ul>
                                <li style={{ color: 'white' }} >. x ...</li>
                                <li style={{ color: 'white' }} >. x ...</li>
                                <li style={{ color: 'white' }} >. x ...</li>
                            </ul>

                        </div>

                        <button disabled style={{ borderRadius: '9px', margin: '5px', width: '65px', backgroundColor: 'white', borderColor: 'black', color: 'black' }} type="button" className="explore btn btn-sm">...</button>
                    </div>
                </div>
                <div className="col">
                    <img style={{ width: '70%', objectFit: 'contain', height: "100%", borderRadius: "0px 5px 5px 0px" }} src={loadingimage} alt="loading..." />
                </div>

            </div>

            
        </div>


    );
}

export default Skeleton;