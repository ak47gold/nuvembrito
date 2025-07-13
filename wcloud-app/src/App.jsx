"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import WordCloud from "wordcloud"

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

function CollapsibleWordBox({
  words,
  onAdd,
  onRemove,
  position,
  onPositionChange,
  title,
  onDragStart,
  onDragEnd,
  rotation = 0,
}) {
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
        transform: isDragging ? `rotate(${rotation}deg) scale(1.05)` : `rotate(${rotation}deg) scale(1)`,
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

function InteractiveParticles({ mousePos, ripples }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Cria apenas 6 partículas bem leves
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.3 + 0.1,
      baseX: 0,
      baseY: 0,
    }))

    newParticles.forEach((p) => {
      p.baseX = p.x
      p.baseY = p.y
    })

    setParticles(newParticles)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => {
          const newX = particle.x + particle.vx
          const newY = particle.y + particle.vy
          let newVx = particle.vx
          let newVy = particle.vy

          // Bounce nas bordas
          if (newX <= 0 || newX >= window.innerWidth) newVx *= -1
          if (newY <= 0 || newY >= window.innerHeight) newVy *= -1

          // Atração sutil ao mouse/toque
          if (mousePos.x > 0 && mousePos.y > 0) {
            const dx = mousePos.x - newX
            const dy = mousePos.y - newY
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 200) {
              const force = ((200 - distance) / 200) * 0.02
              newVx += (dx / distance) * force
              newVy += (dy / distance) * force
            }
          }

          // Limita velocidade
          const speed = Math.sqrt(newVx * newVx + newVy * newVy)
          if (speed > 2) {
            newVx = (newVx / speed) * 2
            newVy = (newVy / speed) * 2
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          }
        }),
      )
    }, 50) // 20 FPS bem leve

    return () => clearInterval(interval)
  }, [mousePos])

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: "absolute",
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            background: `rgba(0, 255, 136, ${particle.opacity})`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(0, 255, 136, ${particle.opacity * 0.5})`,
            transform: "translate(-50%, -50%)",
            willChange: "transform",
          }}
        />
      ))}

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "20px",
            height: "20px",
            border: "2px solid rgba(0, 255, 136, 0.6)",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            animation: "ripple 1s ease-out forwards",
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  )
}

export default function App() {
  const canvasRef = useRef(null)
  const [words, setWords] = useState(availableWords)
  const [isAnyBoxDragging, setIsAnyBoxDragging] = useState(false)
  const [lastWordCloudData, setLastWordCloudData] = useState("")
  const [newWordAnimations, setNewWordAnimations] = useState([])
  const [exitWordAnimations, setExitWordAnimations] = useState([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState([])

  // Posições das 4 caixas
  const [topBoxPos, setTopBoxPos] = useState({ x: 920, y: 20 })
  const [bottomBoxPos, setBottomBoxPos] = useState({ x: 920, y: window.innerHeight - 80 })
  const [leftBoxPos, setLeftBoxPos] = useState({ x: 220, y: 600 })
  const [rightBoxPos, setRightBoxPos] = useState({ x: window.innerWidth - 380, y: 600 })

  // Track mouse/touch position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  const createRipple = () => {
    const rippleId = Date.now()
    setRipples((current) => [...current, { id: rippleId }])

    setTimeout(() => {
      setRipples((current) => current.filter((r) => r.id !== rippleId))
    }, 1000)
  }

  const incrementWord = useCallback((word) => {
    setWords((prev) => {
      const newWords = prev.map(([w, v]) => (w === word ? [w, v + 1] : [w, v]))
      const wordData = newWords.find(([w]) => w === word)

      // Cria ripple effect TODA VEZ que incrementa
      createRipple()

      // Se é a primeira vez que a palavra aparece, anima
      if (wordData && wordData[1] === 1) {
        const animationId = Date.now()
        setNewWordAnimations((current) => [...current, { word, id: animationId }])

        // Remove a animação após 1 segundo
        setTimeout(() => {
          setNewWordAnimations((current) => current.filter((anim) => anim.id !== animationId))
        }, 1000)
      }

      return newWords
    })
  }, [])

  const decrementWord = useCallback((word) => {
    setWords((prev) => {
      const newWords = prev.map(([w, v]) => (w === word ? [w, Math.max(0, v - 1)] : [w, v]))
      const wordData = newWords.find(([w]) => w === word)
      const oldWordData = prev.find(([w]) => w === word)

      // Se a palavra estava na nuvem e agora saiu (count chegou a 0)
      if (oldWordData && oldWordData[1] > 0 && wordData && wordData[1] === 0) {
        const animationId = Date.now()
        setExitWordAnimations((current) => [...current, { word, id: animationId }])

        // Remove a animação após 1 segundo
        setTimeout(() => {
          setExitWordAnimations((current) => current.filter((anim) => anim.id !== animationId))
        }, 1000)
      }

      return newWords
    })
  }, [])

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
          // Limpa o canvas primeiro
          const ctx = canvasRef.current.getContext("2d")
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

          WordCloud(canvasRef.current, {
            list: activeWords,
            gridSize: 16,
            weightFactor: (size) => {
              const base = 16
              const fator = 20
              const maxFontSize = 140
              return Math.min(base + Math.log2(size) * fator, maxFontSize)
            },
            fontFamily: "Rawline, Arial, sans-serif",
            color: (word) => {
              const colors = ["#e8e8e8", "#d4d4d4", "#c0c0c0", "#f0f0f0", "#dcdcdc"]
              return colors[Math.floor(Math.random() * colors.length)]
            },
            backgroundColor: "rgba(0,0,0,0)",
            rotateRatio: 0.4,
            rotationSteps: 2,
            minRotation: -Math.PI / 6,
            maxRotation: Math.PI / 6,
            shuffle: false,
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
      {/* CSS Global com animações */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes float {
            0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
            50% { transform: translate(-50%, -50%) translateY(-10px); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
          }
          
          @keyframes wordPop {
            0% { 
              transform: translate(-50%, -50%) scale(0) rotate(-10deg);
              opacity: 0;
            }
            50% { 
              transform: translate(-50%, -50%) scale(1.2) rotate(5deg);
              opacity: 1;
            }
            100% { 
              transform: translate(-50%, -50%) scale(0) rotate(10deg);
              opacity: 0;
            }
          }

          @keyframes wordExit {
            0% { 
              transform: translate(-50%, -50%) scale(1) rotate(0deg);
              opacity: 1;
            }
            50% { 
              transform: translate(-50%, -50%) scale(0.8) rotate(-15deg);
              opacity: 0.5;
            }
            100% { 
              transform: translate(-50%, -50%) scale(0) rotate(-30deg);
              opacity: 0;
            }
          }

          @keyframes backgroundBreathe {
            0%, 100% { 
              background-size: 100% 100%;
              filter: brightness(1);
            }
            50% { 
              background-size: 110% 110%;
              filter: brightness(1.1);
            }
          }

          @keyframes ripple {
            0% {
              transform: translate(-50%, -50%) scale(0);
              opacity: 1;
            }
            100% {
              transform: translate(-50%, -50%) scale(20);
              opacity: 0;
            }
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
          background: `
            linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0a0a0a 100%),
            radial-gradient(circle at 20% 80%, rgba(0,255,136,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0,204,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255,107,107,0.05) 0%, transparent 50%)
          `,
          animation: "backgroundBreathe 8s ease-in-out infinite",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Partículas interativas */}
        <InteractiveParticles mousePos={mousePos} ripples={ripples} />

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

          {/* Overlay de animações para palavras novas */}
          {newWordAnimations.map(({ word, id }) => (
            <div
              key={id}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "3rem",
                fontWeight: "bold",
                color: "#00ff88",
                fontFamily: "Rawline, Arial, sans-serif",
                pointerEvents: "none",
                zIndex: 20,
                textShadow: "0 0 20px rgba(0,255,136,0.8)",
                animation: "wordPop 1s ease-out forwards",
              }}
            >
              {word}
            </div>
          ))}

          {/* Overlay de animações para palavras que saem */}
          {exitWordAnimations.map(({ word, id }) => (
            <div
              key={id}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "3rem",
                fontWeight: "bold",
                color: "#ff4444",
                fontFamily: "Rawline, Arial, sans-serif",
                pointerEvents: "none",
                zIndex: 20,
                textShadow: "0 0 20px rgba(255,68,68,0.8)",
                animation: "wordExit 1s ease-out forwards",
              }}
            >
              {word}
            </div>
          ))}

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
                fontFamily: "Rawline, Arial, sans-serif",
              }}
            >
              <div
                style={{
                  fontSize: "4rem",
                  marginBottom: "20px",
                  filter: "drop-shadow(0 0 20px rgba(0,255,136,0.5))",
                  animation: "pulse 2s ease-in-out infinite",
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
          rotation={180}
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
          rotation={90}
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
          rotation={-90}
          onDragStart={() => setIsAnyBoxDragging(true)}
          onDragEnd={() => setIsAnyBoxDragging(false)}
        />
      </div>
    </>
  )
}
