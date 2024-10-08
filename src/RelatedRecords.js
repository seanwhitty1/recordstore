import './Recordgrid.css'
import Record from './Record'

function RelatedRecords({collection}){
    console.log("inside related records", collection)
      return(
            <>
            <div className='related-recordgrid-container'>
            {collection.map     
            (r => <Record className='related-recordgrid-item' id={r.id} artist={r.artist} title={r.title} price={r.price} descr={r.descr} genre={r.genre} images={r.images} /> ) }
            </div>
           </>
        )
    }

export default RelatedRecords;