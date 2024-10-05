import { sendFileList } from '@/actions/fileHandler'
import Upload from './_components/Upload'

const UploadPage = async ({ searchParams }: {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}) => {

  const filesData = await sendFileList({
    limit: Number(searchParams.limit) || 1,
    page: Number(searchParams.page) || 10
  })
  return (
    <div className='p-4'>
      <Upload data={filesData.files} total={filesData.results} />
    </div>
  )
}

export default UploadPage