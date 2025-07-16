export default function FormErrorMessages({ errors, textMessage }: { errors: string[], textMessage: string }) {
  return (
    <div className="bg-red-500/50 p-5 mb-3 rounded-sm">
      <p>{ textMessage }</p>
      <ul>
        { errors.map((error) => (
          <li key={error}>- {error}</li>
        ))}
      </ul>
    </div>
  )
}