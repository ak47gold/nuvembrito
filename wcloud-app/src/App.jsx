"use client"

import { useEffect, useRef, useState } from "react"
import WordCloud from "wordcloud"
import sample from '/videos/bg.mp4';

const availableWords = [
  ["Foguete", 0],
  ["Sonho", 0],
  ["Persistência", 0],
  ["Nós", 0],
  ["Brasil", 0],
  ["Livro", 0],
  ["Descoberta", 0],
  ["Sustentabilidade", 0],
  ["Fórmula", 0],
  ["Fundamental", 0],
  ["Futuro", 0],
  ["Calculadora", 0],
  ["Tudo", 0],
  ["Inspiração", 0],
  ["Engrenagem", 0],
  ["Vida", 0],
  ["Teoria", 0],
  ["Saúde", 0],
  ["Ideia", 0],
  ["Necessidade", 0],
  ["Lupa", 0],
  ["Esperança", 0],
  ["Laboratório", 0],
  ["Chip", 0],
  ["Humanidade", 0],
  ["Avião", 0],
  ["Soberania", 0],
  ["Átomo", 0],
  ["Eu", 0],
  ["Universo", 0],
  ["Pesquisa", 0],
  ["Democracia", 0],
  ["Mundo", 0],
  ["Comunidade", 0],
  ["Superação", 0],
  ["Microscópio", 0],
  ["Trabalho", 0],
  ["Educação", 0],
  ["Incrível", 0],
  ["Gente", 0],
  ["Conhecimento", 0],
  ["União", 0],
  ["Amor", 0],
]

function WordCard({ word, count, onAdd, onRemove }) {
  const [isAdding, setIsAdding] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)

  const handleAdd = () => {
    setIsAdding(true)
    onAdd()
    setTimeout(() => setIsAdding(false), 300)
  }

  const handleRemove = () => {
    setIsRemoving(true)
    onRemove()
    setTimeout(() => setIsRemoving(false), 300)
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        margin: "4px 0",
        padding: "8px",
        background:
          count > 0 ? "linear-gradient(135deg, rgba(0,255,100,0.15), rgba(0,200,255,0.15))" : "rgba(255,255,255,0.08)",
        borderRadius: "12px",
        boxSizing: "border-box",
        minWidth: 0,
        border: count > 0 ? "1px solid rgba(0,255,100,0.3)" : "1px solid rgba(255,255,255,0.1)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: count > 0 ? "scale(1.02)" : "scale(1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={handleAdd}
          style={{
            width: "36px",
            height: "36px",
            fontSize: "18px",
            fontWeight: "bold",
            background: isAdding
              ? "linear-gradient(135deg, #00ff88, #00cc66)"
              : "linear-gradient(135deg, rgba(0,255,100,0.4), rgba(0,200,80,0.4))",
            border: "2px solid rgba(0,255,100,0.6)",
            borderRadius: "50%",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isAdding ? "scale(1.2)" : "scale(1)",
            boxShadow: isAdding
              ? "0 0 20px rgba(0,255,100,0.6), 0 0 40px rgba(0,255,100,0.3)"
              : "0 4px 12px rgba(0,255,100,0.2)",
          }}
        >
          +
        </button>
        <span
          style={{
            fontSize: "1.1rem",
            fontWeight: "bold",
            minWidth: "35px",
            textAlign: "center",
            color: count > 0 ? "#00ff88" : "#fff",
            textShadow: count > 0 ? "0 0 10px rgba(0,255,100,0.5)" : "none",
            transition: "all 0.3s ease",
          }}
        >
          {count}
        </span>
        <button
          onClick={handleRemove}
          style={{
            width: "36px",
            height: "36px",
            fontSize: "18px",
            fontWeight: "bold",
            background: isRemoving
              ? "linear-gradient(135deg, #ff4444, #cc2222)"
              : "linear-gradient(135deg, rgba(255,60,60,0.4), rgba(200,40,40,0.4))",
            border: "2px solid rgba(255,60,60,0.6)",
            borderRadius: "50%",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isRemoving ? "scale(1.2)" : "scale(1)",
            boxShadow: isRemoving
              ? "0 0 20px rgba(255,60,60,0.6), 0 0 40px rgba(255,60,60,0.3)"
              : "0 4px 12px rgba(255,60,60,0.2)",
          }}
        >
          -
        </button>
      </div>
      <span
        style={{
          marginLeft: 12,
          fontWeight: 600,
          fontSize: "1rem",
          color: count > 0 ? "#fff" : "rgba(255,255,255,0.7)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          flex: 1,
          textShadow: count > 0 ? "0 2px 8px rgba(0,0,0,0.3)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        {word}
      </span>
    </div>
  )
}

function CollapsibleWordBox({ words, onAdd, onRemove, position, onPositionChange, title, onDragStart, onDragEnd }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })

  const handleStart = (e) => {
    setIsDragging(true)
    onDragStart?.()
    const clientX = e.clientX || e.touches?.[0]?.clientX || 0
    const clientY = e.clientY || e.touches?.[0]?.clientY || 0
    setDragStart({ x: clientX, y: clientY })
    setStartPosition(position)
    document.body.style.userSelect = "none"
  }

  const handleMove = (e) => {
    if (!isDragging) return
    const clientX = e.clientX || e.touches?.[0]?.clientX || 0
    const clientY = e.clientY || e.touches?.[0]?.clientY || 0

    onPositionChange({
      x: startPosition.x + (clientX - dragStart.x),
      y: startPosition.y + (clientY - dragStart.y),
    })
  }

  const handleEnd = () => {
    setIsDragging(false)
    onDragEnd?.()
    document.body.style.userSelect = ""
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e) => handleMove(e)
    const handleMouseUp = () => handleEnd()
    const handleTouchMove = (e) => {
      e.preventDefault()
      handleMove(e)
    }
    const handleTouchEnd = () => handleEnd()

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isDragging, dragStart, startPosition])

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        background: isDragging
          ? "linear-gradient(135deg, rgba(0,0,0,0.95), rgba(20,20,40,0.95))"
          : "linear-gradient(135deg, rgba(0,0,0,0.9), rgba(15,15,30,0.9))",
        border: isDragging ? "2px solid rgba(0,255,200,0.6)" : "1px solid rgba(255,255,255,0.2)",
        borderRadius: "16px",
        padding: isCollapsed ? "12px" : "16px",
        width: isCollapsed ? "140px" : "320px",
        maxHeight: isCollapsed ? "60px" : "420px",
        overflowX: "hidden",
        zIndex: 100,
        cursor: isDragging ? "grabbing" : "grab",
        backdropFilter: "blur(20px)",
        transition: isDragging ? "none" : "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isDragging ? "scale(1.05)" : "scale(1)",
        boxShadow: isDragging
          ? "0 20px 60px rgba(0,255,200,0.2), 0 0 40px rgba(0,255,200,0.1)"
          : "0 10px 30px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.05)",
      }}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "1.1rem",
          fontWeight: "bold",
          color: "#fff",
          marginBottom: isCollapsed ? "0" : "12px",
          textShadow: "0 2px 8px rgba(0,0,0,0.5)",
        }}
      >
        <span
          style={{
            background: "linear-gradient(135deg, #00ff88, #00ccff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {title}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsCollapsed(!isCollapsed)
          }}
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "8px",
            color: "#fff",
            cursor: "pointer",
            padding: "6px 10px",
            fontSize: "14px",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          {isCollapsed ? "▼" : "▲"}
        </button>
      </div>

      {!isCollapsed && (
        <div
          style={{
            maxHeight: "360px",
            overflowY: "auto",
            overflowX: "hidden",
            width: "100%",
            paddingRight: "4px",
          }}
        >
          {words.map(([word, count]) => (
            <WordCard key={word} word={word} count={count} onAdd={() => onAdd(word)} onRemove={() => onRemove(word)} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function App() {
  const canvasRef = useRef(null)
  const videoRef = useRef(null)
  const [words, setWords] = useState(availableWords)
  const [isAnyBoxDragging, setIsAnyBoxDragging] = useState(false)
  const [lastWordCloudData, setLastWordCloudData] = useState("")
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Posições das 4 caixas
  const [topBoxPos, setTopBoxPos] = useState({ x: 1200, y: 20 })
  const [bottomBoxPos, setBottomBoxPos] = useState({ x: 1200, y: window.innerHeight - 80 })
  const [leftBoxPos, setLeftBoxPos] = useState({ x: 220, y: 600 })
  const [rightBoxPos, setRightBoxPos] = useState({ x: window.innerWidth - 380, y: 600 })

  const incrementWord = (word) => {
    setWords((prev) => prev.map(([w, v]) => (w === word ? [w, v + 1] : [w, v])))
  }

  const decrementWord = (word) => {
    setWords((prev) => prev.map(([w, v]) => (w === word ? [w, Math.max(0, v - 1)] : [w, v])))
  }

  // Filtra palavras com valor > 0 para o WordCloud
  const activeWords = words.filter(([word, count]) => count > 0)

  // Atualiza WordCloud apenas quando as palavras mudam, não durante drag
  useEffect(() => {
    if (canvasRef.current && !isAnyBoxDragging) {
      const currentData = JSON.stringify(activeWords)

      // Só atualiza se os dados realmente mudaram
      if (currentData !== lastWordCloudData) {
        setLastWordCloudData(currentData)

        if (activeWords.length > 0) {
          WordCloud(canvasRef.current, {
            list: activeWords,
            gridSize: 16,
            weightFactor: (size) => {
              const base = 16
              const fator = 20
              const maxFontSize = 140
              return Math.min(base + Math.log2(size) * fator, maxFontSize)
            },
            fontFamily: "Arial, sans-serif",
            color: () => {
              const colors = ["#e8e8e8", "#d4d4d4", "#c0c0c0", "#f0f0f0", "#dcdcdc"]
              return colors[Math.floor(Math.random() * colors.length)]
            },
            backgroundColor: "rgba(0,0,0,0)",
            rotateRatio: 0.4,
            rotationSteps: 2,
            minRotation: -Math.PI / 6,
            maxRotation: Math.PI / 6,
            shuffle: false, // Evita randomização
            drawOutOfBound: false,
            shrinkToFit: true,
          })
        } else {
          // Limpa o canvas quando não há palavras
          const ctx = canvasRef.current.getContext("2d")
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        }
      }
    }
  }, [activeWords, isAnyBoxDragging, lastWordCloudData])

  return (
    <>
      {/* CSS Global */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes float {
            0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
            50% { transform: translate(-50%, -50%) translateY(-10px); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `,
        }}
      />

      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          width: "100vw",
          overflow: "hidden",
          background: "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0a0a0a 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Vídeo de fundo */}
        

        <video
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            zIndex: 1,
            pointerEvents: "none",
            opacity: videoLoaded ? 0.5 : 1,
            transition: "opacity 1s ease-in-out",
          }}
          autoPlay loop muted>
            <source src={sample} type='video/mp4' />
        </video>

        {/* Overlay sutil para melhorar legibilidade */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 2,
          }}
        />

        {/* Canvas central */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <canvas
            ref={canvasRef}
            width={900}
            height={600}
            style={{
              background: "transparent",
              filter: "drop-shadow(0 0 20px rgba(255,255,255,0.1))",
            }}
          />

          {/* Mensagem quando vazio */}
          {activeWords.length === 0 && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "rgba(255,255,255,0.9)",
                fontSize: "1.8rem",
                fontWeight: "300",
                pointerEvents: "none",
                animation: "float 3s ease-in-out infinite",
                textShadow: "0 4px 12px rgba(0,0,0,0.8)",
              }}
            >
              <div
                style={{
                  fontSize: "4rem",
                  marginBottom: "20px",
                  filter: "drop-shadow(0 0 20px rgba(0,255,136,0.5))",
                }}
              >
                ✨
              </div>
              <div
                style={{
                  background: "linear-gradient(135deg, #00ff88, #00ccff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "12px",
                  fontWeight: "600",
                }}
              >
                Crie sua nuvem de palavras
              </div>
              <div
                style={{
                  fontSize: "1.2rem",
                  opacity: 0.9,
                  textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                }}
              >
                Use os controles + para adicionar palavras
              </div>
            </div>
          )}
        </div>

        {/* 4 Caixas de controle retráteis */}
        <CollapsibleWordBox
          words={words}
          onAdd={incrementWord}
          onRemove={decrementWord}
          position={topBoxPos}
          onPositionChange={setTopBoxPos}
          title="TOP"
          onDragStart={() => setIsAnyBoxDragging(true)}
          onDragEnd={() => setIsAnyBoxDragging(false)}
        />

        <CollapsibleWordBox
          words={words}
          onAdd={incrementWord}
          onRemove={decrementWord}
          position={bottomBoxPos}
          onPositionChange={setBottomBoxPos}
          title="BOTTOM"
          onDragStart={() => setIsAnyBoxDragging(true)}
          onDragEnd={() => setIsAnyBoxDragging(false)}
        />

        <CollapsibleWordBox
          words={words}
          onAdd={incrementWord}
          onRemove={decrementWord}
          position={leftBoxPos}
          onPositionChange={setLeftBoxPos}
          title="LEFT"
          onDragStart={() => setIsAnyBoxDragging(true)}
          onDragEnd={() => setIsAnyBoxDragging(false)}
        />

        <CollapsibleWordBox
          words={words}
          onAdd={incrementWord}
          onRemove={decrementWord}
          position={rightBoxPos}
          onPositionChange={setRightBoxPos}
          title="RIGHT"
          onDragStart={() => setIsAnyBoxDragging(true)}
          onDragEnd={() => setIsAnyBoxDragging(false)}
        />
      </div>
    </>
  )
}
