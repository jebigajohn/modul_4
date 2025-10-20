export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-6 h-6 border-2 border-ring border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
